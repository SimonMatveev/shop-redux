const { DATA_ERR_STATUS } = require("../utils/constants");

class DataError extends Error {
  constructor(message) {
    super(message);
    this.status = DATA_ERR_STATUS;
    this.name = 'DataError';
  }
}

module.exports = DataError;
