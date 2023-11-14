const { AUTH_ERR_STATUS } = require("../utils/constants");

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.status = AUTH_ERR_STATUS;
    this.name = 'AuthError';
  }
}

module.exports = AuthError;
