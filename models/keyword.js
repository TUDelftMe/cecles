/**
 * New node file
 */
var db = require('./../db');
var connection = db.connect();
var Course = require('./course');
var Article = require('./article');
var Keyword = require('./keyword');

exports.getKeywordById = function(id, callback) {
	Keyword.getKeywordsByIds([id], function(keywords) {
		if (keywords.length > 0)
			callback(keywords[0]);
		else
			callback({});
	});
}

exports.getKeywordsByIds = function(ids, callback) {
	connection.query('SELECT * FROM keyword WHERE id IN ('+ids.join(',')+')', function(err, rows, fields) {
		if (err)
			throw err;  		
		keywords = rows;
		callback(keywords);
	});
}

exports.getKeywords = function(callback) {
	connection.query('SELECT * FROM keyword', function(err, rows, fields) {
		if (err) throw err;  		
		callback(rows);
	});
}

exports.getKeywordsByLikeName = function(name, callback) {
  var escapedName = connection.escape(name);
	connection.query('SELECT * FROM keyword WHERE keyword.name LIKE "%'+escapedName.substring(1,escapedName.length-1)+'%"', function(err, rows, fields) {
		if (err) throw err;  		
		callback(rows);
	});
}

exports.getKeywordsByCourseId = function(courseId, callback) {
	Keyword.getKeywordsByCourseIds([courseId], function(keywords) {
		callback(keywords);
	});
}

exports.getKeywordsByCourseIds = function(courseIds, callback) {
	connection.query('SELECT k.*, ck.relevance FROM course_keyword AS ck LEFT JOIN keyword AS k ON k.id = ck.id_keyword WHERE ck.id_course IN ('+courseIds.join(',')+')', function(err, rows, fields) {
		if (err) throw err;  		
		keywords = rows;
		callback(keywords);
	});
}

exports.getRandomKeywords = function(limit, callback) {
	connection.query('SELECT * FROM keyword ORDER BY RAND() LIMIT '+connection.escape(limit), function(err, keywords, fields) {
		callback(keywords);
	});
}
