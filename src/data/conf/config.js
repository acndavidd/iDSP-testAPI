var config = {};

config.mysql = {};

config.serviceURL = 'http://127:0:0:1/service/';

//database config
config.mysql.servername = 'localhost';
config.mysql.port = '3306';//default
config.mysql.username = 'root';
config.mysql.password = '';
config.mysql.dbname = 'visitordb';

//token config
config.key = 'J@karta';

module.exports = config;