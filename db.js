/**
 * Returns db connection
 */
var config = require('./config');
var mysql = require('mysql');

module.exports = { connect: function() {
		var connection = mysql.createConnection({
		  host     : config.database.host,
		  user     : config.database.user,
		  password : config.database.password,
		  database : config.database.database,
		  charset	 : 'latin1_swedish_ci'
		});
	
		connection.connect(function(err) {
			if (err)
				throw err;
		});
		
		return connection;	
	}
}