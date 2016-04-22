
var config = require('../conf/config.js');

export class MySql{
	
	constructor(){
	}

	executeQuery(query:string){
		return new Promise<string>(function(resolve,reject){
			let mysql_con : any;
			let mysql = require('mysql');
			mysql_con = mysql.createConnection({
				host	: config.mysql.servername,
				port	: config.mysql.port,
				user	: config.mysql.username,
				password: config.mysql.password,
				database: config.mysql.dbname
			});
			mysql_con.query(query,function(err,rows){
				if(err){
					reject(err + 'error bro');
					console.error('error while executing query: ' + query);
					return;
				}
				resolve(rows);
			});
			mysql_con.end(function(err){
				console.error('error closing connection: ');
			});
		});
	}
}