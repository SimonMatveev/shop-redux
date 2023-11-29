const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');
const { LOGIN_ERR, PLATFORM_ENUM } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  cart: {
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    totalPriceWithSale: {
      type: Number,
      required: true,
      default: 0,
    },
    items: [{
      itemInCart: {
        type: mongoose.Schema.ObjectId,
        ref: 'item',
        required: true,
      },
      orders: [
        {
          amount: {
            type: Number,
            required: true,
            default: 1,
          },
          platform: {
            type: String,
            required: true,
          },
        }
      ],
      _id: false,
    }]
  }
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(LOGIN_ERR));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError(LOGIN_ERR));
          }
          return user;
        });
    });
};

userSchema.statics.incrementCart = function (userId, { itemId, platform }) {
  return this.findById(userId)
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFoundError());
      }
      const indexOfItem = user.cart.items.findIndex(item => item.itemInCart.equals(itemId));
      if (indexOfItem === -1) {
        const newOrder = {
          itemInCart: itemId,
          orders: [{
            platform: platform,
            amount: 1,
          }]
        }
        user.cart.items.push(newOrder); 
      } else {
        const indexOfPlatform = user.cart.items[indexOfItem].orders.findIndex(item => item.platform === platform);
        if (indexOfPlatform === -1) {
          user.cart.items[indexOfItem].orders.push({
            platform: platform,
            amount: 1,
          })
        } else {
          user.cart.items[indexOfItem].orders[indexOfPlatform].amount++;
        }
      }
      return user.cart;
    })
    .then(cart => this.findByIdAndUpdate(userId, { cart }, {
      new: true,
      runValidators: true,
    }).populate({
      path: 'cart',
      populate: {
        path: 'items',
        populate: {
          path: 'itemInCart'
        }
      }
    }));
};

userSchema.statics.decrementCart = function (userId, { itemId, platform }) {
  return this.findById(userId)
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFoundError());
      }
      const indexOfItem = user.cart.items.findIndex(item => item.itemInCart.equals(itemId));
      if (indexOfItem === -1) {
        return user.cart;
      } else {
        const indexOfPlatform = user.cart.items[indexOfItem].orders.findIndex(item => item.platform === platform);
        if (indexOfPlatform === -1) {
          return user.cart;
        } else if (user.cart.items[indexOfItem].orders[indexOfPlatform].amount > 1) {
          user.cart.items[indexOfItem].orders[indexOfPlatform].amount--;
        } else {
          user.cart.items[indexOfItem].orders.splice(indexOfPlatform, 1);
          if (user.cart.items[indexOfItem].orders.length === 0) user.cart.items.splice(indexOfItem, 1);
        }
      }
      return user.cart;
    })
    .then(cart => this.findByIdAndUpdate(userId, { cart }, {
      new: true,
      runValidators: true,
    }).populate({
      path: 'cart',
      populate: {
        path: 'items',
        populate: {
          path: 'itemInCart'
        }
      }
    }))
    ;
};

module.exports = mongoose.model('user', userSchema);
