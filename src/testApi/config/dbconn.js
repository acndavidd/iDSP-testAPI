var dbconn = {};

dbconn.pool = {};

dbconn.dialect = 'postgres';
dbconn.host = 'localhost';
dbconn.name = 'postgres';
dbconn.user = 'postgres';
dbconn.pass = '123456';
dbconn.pool.max = 5;
dbconn.pool.min = 0;
dbconn.pool.idle = 10000;
module.exports = dbconn;