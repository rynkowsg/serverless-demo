const { StatusError } = require('./lib/error');
// const { add, multiply } = require('calc-cljs/calc') // when `:target :npm-module`
const { add, multiply } = require('../gen/calc')    // when `:target :esm`

const endpointAdd = (req, res) => {
  const { data } = req.query;
  if (!data) {
    throw new StatusError(400, "Missing 'data' query param");
  }
  const numbers = data.map((v) => parseInt(v))
  const result = add(numbers);
  res.status(200).json({ result });
  return res.end();
};

const endpointMultiply = (req, res) => {
  const { data } = req.body;
  if (!data) {
    throw new StatusError(400, "Missing 'data' body property");
  }
  const numbers = data.map((v) => parseInt(v))
  const result = multiply(numbers);
  res.status(200).json({ result });
  return res.end();
};


module.exports = {
  endpointAdd,
  endpointMultiply,
};

// Testing:
// curl -X GET http://localhost:3000/dev/calc/add\?data\[\]=1\&data\[\]=2\&data\[\]=3
// curl -X POST -H "Content-Type: application/json" -d '{"data": [1, 2, 3, 4, 5]}' http://localhost:3000/dev/calc/multiply
