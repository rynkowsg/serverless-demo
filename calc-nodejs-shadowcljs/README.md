### Run

start shadow-cljs:

    npm run shadow:watch

start serverless offline

    npm run start

try endpoints

    curl -X GET http://localhost:3000/dev/calc/add\?data\[\]=1\&data\[\]=2\&data\[\]=3
    curl -X POST -H "Content-Type: application/json" -d '{"data": [1, 2, 3, 4, 5]}' http://localhost:3000/dev/calc/multiply
