const express = require('express');
const { StatusError } = require('./lib/error');

const endpointAdd = (req, res) => {
  const { data } = req.query;
  if (!data) {
    throw new StatusError(400, "Missing 'data' query param");
  }
  const result = data.reduce((acc, value) => acc + parseInt(value), 0);
  res.status(200).json({ result });
  return res.end();
};

const endpointMultiply = (req, res) => {
  const { data } = req.body;
  if (!data) {
    throw new StatusError(400, "Missing 'data' body property");
  }
  const result = data.reduce((acc, value) => acc * value);
  res.status(200).json({ result });
  return res.end();
};

const calc = express.Router();
calc.get('/calc/add', endpointAdd);
calc.post('/calc/multiply', endpointMultiply);

module.exports = calc;

// Testing:
// curl -X GET http://localhost:3000/dev/calc/add\?data\[\]=1\&data\[\]=2\&data\[\]=3
// curl -X POST -H "Content-Type: application/json" -d '{"data": [1, 2, 3, 4, 5]}' http://localhost:3000/dev/calc/multiply
