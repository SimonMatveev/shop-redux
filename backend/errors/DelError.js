const { DEL_ERR_STATUS } = require('../utils/constants');

class DelError extends Error {
  constructor(message) {
    super(message);
    this.status = DEL_ERR_STATUS;
    this.name = 'DelError';
  }
}

module.exports = DelError;
