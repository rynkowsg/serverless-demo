const { ValidationError } = require('express-validation');
const { logger } = require('./logger');

class StatusError extends Error {
  constructor(status, message, data) {
    super(message);
    this.status = status;
    this.message = message;
    this.data = data;
  }

  toJSON() {
    return {
      status: this.status,
      message: this.message,
      data: this.data,
    };
  }
}

const errorHandler = (err, req, res) => {
  logger.error(err.stack);
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json(err);
    return res.end();
  }
  const isStatusError = err instanceof StatusError;
  const status = typeof err.status === 'number' ? err.status : 500;
  const message = isStatusError ? err.message : 'Server error. Please retry.';
  res.status(status).json({
    ...(isStatusError ? err : {}),
    message: message,
  });
  return res.end();
};

module.exports = {
  StatusError,
  errorHandler,
};
