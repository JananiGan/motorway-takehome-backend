const fetchData = require('../db/fetchdata');
const pino=require('pino');
const logger=pino({});

module.exports.getVehicleState = async (request) => {
    const requestJson = request.body;
    let response = {};
    try {
        if (requestJson.id && requestJson.timestamp) {
            const results = await fetchData.getVehicleStateFromDB(requestJson.id, requestJson.timestamp)
            if (results) {
                logger.info("Results fetched from db for vehicle id "+requestJson.id)
                response = {
                    statusCode: 200,
                    body: {
                        status: "Success",
                        data: results
                    }
                }
            } else {
                logger.info("No results found for vehicle id "+requestJson.id)
                response = {
                    statusCode: 400,
                    body: {
                        status: "Fail",
                        message: "No data found. Please check the input"
                    }
                }
            }
        } else {
            logger.error("Missing data in the request. Vehicle id and timestamp required")
            response = {
                statusCode: 400,
                body: {
                    status: "Fail",
                    message: "Missing data in the request. Vehicle id and timestamp required"
                }
            }
        }
    } catch (error) {
        logger.error("Failed to fetch data from db "+error)
        response = {
            statusCode: 500,
            body: {
                status: "Fail",
                message: error.message
            }
        }
    }
    return response
}