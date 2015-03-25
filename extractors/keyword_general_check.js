/**
 * New node file
 */
var db = require('./../db')
connection = db.connect();
var Keyword = require('./../models/keyword.js');
var fs = require('fs');

connection.safe_query('SELECT COUNT(*) AS count FROM course', function(rows, fields) {
	var total = rows[0]['count'];
	
	Keyword.getKeywords(function(keywords) {
		keywords.forEach(function(keyword) {
			var search = connection.escape(keyword.name).replace(')', '').replace('(', '');
			connection.safe_query('SELECT * FROM course WHERE contents REGEXP('+search+') OR studygoals REGEXP('+search+')', function(rows, fields) {
				if (rows.length / total > 0.025) {
					Keyword.removeKeywordById(keyword.id, function(result) {
						console.log(keyword.name+'\t'+(rows.length / total));
					});
				}
			});
		});
	});
});