const {
  SERVER_ERROR_CODE,
} = require('../utils/constants');

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = SERVER_ERROR_CODE;
  }
}

module.exports = ServerError;
