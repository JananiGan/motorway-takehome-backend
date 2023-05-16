Install requirements:
 - docker (https://docs.docker.com/get-docker/)

To initialize this project, run `docker compose up` from the root of this project. This will build and seed the database. By default the database runs on port `5432` and is also exposed on `5432`, if you want to change this you can update `docker-compose.yml`.

API:

NPM Commands to run locally:
npm install
npm start

To run unit tests:
npm test

To build:
npm run build

Example Request:
http://localhost:3000/vehicle/state
{
    "id":3,
    "timestamp":"2022-09-12 10:00:00+00"
}

Example Response:
{
    "status": "Success",
    "data": {
        "id": 3,
        "make": "VW",
        "model": "GOLF",
        "state": "selling",
        "vehicleId": 3,
        "timestamp": "2022-09-11T23:21:38.000Z"
    }
}