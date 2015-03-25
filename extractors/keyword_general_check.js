/**
 * New node file
 */
var db = require('./../db')
connection = db.connect();
var Keyword = require('./../models/keyword.js');
var fs = require('fs');

connection.query('SELECT COUNT(*) AS count FROM course', function(err, rows, fields) {
	if (err) throw err;  	
	var total = rows[0]['count'];
	
	Keyword.getKeywords(function(keywords) {
		keywords.forEach(function(keyword) {
			var search = connection.escape(keyword.name).replace(')', '').replace('(', '');
			connection.query('SELECT * FROM course WHERE contents REGEXP('+search+') OR studygoals REGEXP('+search+')', function(err, rows, fields) {
				if (err) throw err;
				if (rows.length / total > 0.025) {
					Keyword.removeKeywordById(keyword.id, function(result) {
						console.log(keyword.name+'\t'+(rows.length / total));
					});
				}
			});
		});
	});
});