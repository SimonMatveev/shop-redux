const { NOT_FOUND_ERR_STATUS } = require("../utils/constants");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = NOT_FOUND_ERR_STATUS;
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
