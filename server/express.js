const express = require('express');
const bodyParser = require('body-parser');
const helper = require('../utils/helper');
const app = express();
const port = process.env.APPPORT | 3000;

app.use(bodyParser.json());
app.get('/vehicle/state', async (request, response) => {
    const res = await helper.getVehicleState(request);
    response.status(res.statusCode).send(res.body);
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
