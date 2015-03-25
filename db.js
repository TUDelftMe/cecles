/**
 * Returns db connection
 */
var config = require('./config');
var mysql = require('mysql');

module.exports = {
  connect: function () {

    var connection = mysql.createPool({
      host: config.database.host,
      user: config.database.user,
      password: config.database.password,
      database: config.database.database,
      charset: 'latin1_swedish_ci'
    });

    connection.safe_query = function (sql_query, callback) {
      connection.getConnection(function (err, connection) {
        if (err) {
          console.log(err);
          return;
        }
        connection.query(sql_query, function (err, rows, fields) {
          connection.release();
          if (err) {
          	console.log(sql_query);
            throw err;
            return;
          }
          callback(rows, fields);
        });
      });
    };
    return connection;
  }
};