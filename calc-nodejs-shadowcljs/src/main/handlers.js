const serverlessHttp = require('serverless-http');
const express = require('express');
const { errorHandler } = require('./lib/error');
const { logger } = require('./lib/logger');
const { endpointAdd, endpointMultiply } = require("./calc");

const calc = express.Router();
calc.get('/calc/add', endpointAdd);
calc.post('/calc/multiply', endpointMultiply);

const calcApp = express();
calcApp.use(express.json()); // parse body
calcApp.use(calc)
calcApp.use(errorHandler);

const calcHandler = serverlessHttp(calcApp)

const helloHandler = async (event) => {
  logger.info(event);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello!', input: event }, null, 2),
  };
};

module.exports = {
  calcHandler,
  helloHandler,
};
