const Pool = require('pg').Pool
module.exports.pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    connectionTimeoutMillis:process.env.PGCONNECTIONTIMEOUT
})