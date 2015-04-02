/**
 * New node file
 */
var db = require('./../db')
connection = db.connect();
var Keyword = require('./../models/keyword.js');
var fs = require('fs');

connection.safe_query('SELECT MAX(google_results) AS max, MIN(google_results) AS min FROM keyword WHERE google_results IS NOT NULL', function(rows, fields) {
	var max = rows[0].max;
	var min = rows[0].min;
	
	var i = 0;
	connection.safe_query('SELECT * FROM keyword WHERE google_results IS NOT NULL', function(rows, fields) {
		rows.forEach(function(keyword) { 		
			// normalize values
			var score = (keyword.google_results - min) / (max - min);
		
			if (score > 0.02) {
				Keyword.removeKeywordById(keyword.id, function(result) {
					i++;
					console.log(i);
					console.log(keyword.name+'\t'+score);
				});
			}
		});
	});
});