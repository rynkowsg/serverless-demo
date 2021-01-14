const serverlessHttp = require('serverless-http');
const express = require('express');
const { errorHandler } = require('./lib/error');
const { logger } = require('./lib/logger');
const calc = require('./calc');

const calcApp = express();
calcApp.use(express.json()); // parse body
calcApp.use(calc);
calcApp.use(errorHandler);

module.exports.calc = serverlessHttp(calcApp);

module.exports.hello = async (event) => {
  logger.info(event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello!', input: event }, null, 2),
  };
};
