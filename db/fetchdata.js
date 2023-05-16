
const clientPool = require('./config').pool;
const pino=require('pino');
const logger=pino({});

module.exports.getVehicleStateFromDB = async (vehicleId, timestamp) => {
    let resp = {}
    await clientPool.query('select * from "vehicles" inner join "stateLogs" on "vehicles"."id"="stateLogs"."vehicleId" where "vehicles"."id"=$1 and "stateLogs"."timestamp"<$2 order by "stateLogs"."timestamp" DESC LIMIT 1', [vehicleId, timestamp]).then((results) => {
        if (results.rows) {
            resp = results.rows[0];
        }
    }).catch((error) => {
        logger.error("Error fetching data from db "+error);
        throw new Error(error.message);
    })
    return resp;
}



