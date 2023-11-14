const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/AuthError');
const { LOGIN_ERR } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');
const { calculateTotalPrice } = require('../utils/functions');

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
      }, amount: {
        type: Number,
        required: true,
        default: 1,
      },
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

userSchema.statics.incrementCart = function (userId, itemId) {
  return this.findById(userId)
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFoundError());
      }
      const index = user.cart.items.findIndex(item => item.itemInCart.equals(itemId));
      if (index === -1) {
        user.cart.items.push({ itemInCart: itemId });
      } else {
        user.cart.items[index].amount++;
      }
      console.log(user.cart);
      return user.cart;
    })
    .then(cart => this.findByIdAndUpdate(userId, { cart }, {
      new: true,
      runValidators: true,
    }))
    ;
};

userSchema.statics.decrementCart = function (userId, itemId) {
  return this.findById(userId)
    .then((user) => {
      if (!user) {
        return Promise.reject(new NotFoundError());
      }
      const index = user.cart.items.findIndex(item => item.itemInCart.equals(itemId));
      if (index === -1) {
        return user.cart;
      } else if (user.cart.items[index].amount > 1) {
        user.cart.items[index].amount--;
      } else {
        user.cart.items.splice(index, 1);
      }
      return user.cart;
    })
    .then(cart => this.findByIdAndUpdate(userId, { cart }, {
      new: true,
      runValidators: true,
    }))
    ;
};

module.exports = mongoose.model('user', userSchema);
