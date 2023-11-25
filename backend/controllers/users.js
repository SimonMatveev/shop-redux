const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const DataError = require('../errors/DataError');
const { JWT_SECRET_DEV } = require('../utils/config');
const {
  GET_USER_ERR,
  CREATE_USER_ERR,
  PATCH_USER_ERR,
  LOGOUT_MSG,
} = require('../utils/constants');
const { calculateTotalPrice } = require('../utils/functions');

const { NODE_ENV, JWT_SECRET } = process.env;

function getUsers(req, res, next) {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError(GET_USER_ERR));
      } else next(err);
    });
}

function getCurrentUser(req, res, next) {
  User.findById(req.user._id).populate({
    path: 'cart',
    populate: {
      path: 'items',
      populate: {
        path: 'itemInCart'
      }
    }
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      calculateTotalPrice(user.cart);
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new DataError(GET_USER_ERR));
      } else next(err);
    });
}

function createUser(req, res, next) {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      data: {
        name: user.name,
        email: user.email,
        _id: user._id,
        cart: user.cart,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError(CREATE_USER_ERR));
      } else next(err);
    });
}

async function updateUser(req, res, next) {
  try {
    const { name, email, password } = req.body;
    let hash;
    if (password) {
      hash = await bcrypt.hash(password, 10)
    }
    const user = password ? await User.findByIdAndUpdate(req.user._id, { name, email, password: hash }, {
      new: true,
      runValidators: true,
    }) : await User.findByIdAndUpdate(req.user._id, { name, email }, {
      new: true,
      runValidators: true,
    })
    res.send(user)
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new DataError(PATCH_USER_ERR));
    } else next(err);
  }
}

function login(req, res, next) {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });
      res.send({
        data: {
          name: user.name,
          email: user.email,
          _id: user._id,
        }
      });
    })
    .catch(next);
}

function logout(req, res, next) {
  try {
    res.clearCookie('jwt');
    res.send({ message: LOGOUT_MSG });
  } catch (err) {
    next(err);
  }
}

function incrementCart(req, res, next) {
  const { itemId, platform } = req.body;
  return User.incrementCart(req.user._id, { itemId, platform })
    .then((user) => {
      calculateTotalPrice(user.cart);
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError(PATCH_USER_ERR));
      } else next(err);
    });
}

function decrementCart(req, res, next) {
  const { itemId, platform } = req.body;
  return User.decrementCart(req.user._id, { itemId, platform })
    .then((user) => {
      calculateTotalPrice(user.cart);
      res.send(user)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new DataError(PATCH_USER_ERR));
      } else next(err);
    });
}

function clearCart(req, res, next) {
  User.findByIdAndUpdate(req.user._id, {
    cart: {
      items: [],
      totalPrice: 0,
      totalPriceWithSale: 0,
    }
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch(next);
}

module.exports = {
  getUsers,
  getCurrentUser,
  createUser,
  updateUser,
  login,
  logout,
  incrementCart,
  decrementCart,
  clearCart,
};
