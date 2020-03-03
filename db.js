const sql = require('mssql');
const config = require('./config.js');
getConnection = async () => {
    try {
        let connection = await sql.connect(config.DBCREDS);
        console.log('Database connected succesfully...');
        return connection;
    } catch (err) {
        console.log(err);
    }
}
module.exports=getConnection;