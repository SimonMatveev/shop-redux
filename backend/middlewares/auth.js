const jsonwebtoken = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
require('dotenv').config();
const { AUTH_ERR, TOKEN_ERR } = require('../utils/constants');
const { JWT_SECRET_DEV } = require('../utils/config');

const { NODE_ENV, JWT_SECRET } = process.env;

function auth(req, res, next) {
  const { jwt } = req.cookies;

  if (!jwt) {
    return next(new AuthError(AUTH_ERR));
  }

  let payload;

  try {
    payload = jsonwebtoken.verify(
      jwt,
      NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV
    );
  } catch (err) {
    return next(new AuthError(TOKEN_ERR));
  }

  req.user = payload;
  return next();
}

module.exports = auth;
