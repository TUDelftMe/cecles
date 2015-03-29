/**
 * New node file
 */
var google = require('../apis/google')
var sleep = require('sleep');
var Keyword = require('../models/keyword')

var db = require('./../db')
connection = db.connect();

function extractResults() {
	connection.safe_query('SELECT * '+
			'FROM keyword '+
			'WHERE google_results IS NULL LIMIT 10', function (keywords, fields) {
		var i = 0;
		keywords.forEach(function(k) {
			searchGoogle(k.name, k.id);
			sleep.usleep(750000);
			i++;
			if (i >= 10) {
				i = 0;
				setTimeout(function() { 
					extractResults();
				}, 1500);
			}
		});
	});
}

function searchGoogle(query, id) {
	console.log("searchGoogle");
	google(query, function (err, total){
		if (err) 
			console.log(err);
		else
			addTotal(id, total);
	})
}

function addTotal(id, total) {
	console.log(total);
	connection.safe_query('UPDATE keyword SET google_results = '+connection.escape(total)+' WHERE id = '+connection.escape(id), function(result) {
		console.log(result);
	});
}

extractResults();