/**
 * New node file
 */
var db = require('./../db');
var connection = db.connect();
var Course = require('./course');
var Article = require('./article');
var Keyword = require('./keyword');

exports.getCourseKeywordById = function(courseId, keywordId, callback) {
	connection.query('SELECT * FROM course_keyword WHERE id = '+connection.escape(id), function(err, rows, fields) {
		if (err) throw err;  	
		callback(rows[0]);
	});
}

exports.getCourseKeywordByCourseIdKeywordId = function(courseId, keywordId, callback) {
	connection.query('SELECT * FROM course_keyword WHERE id_keyword = '+connection.escape(keywordId)+' AND id_course = '+connection.escape(courseId), function(err, rows, fields) {
		if (err) throw err;  	
		callback(rows[0]);
	});
}

exports.userAllowedToVote = function(userId, courseKeywordId, callback) {
	connection.query('SELECT COUNT(*) AS count FROM remove_user_keyword WHERE id_user = '+connection.escape(userId)+' AND id_course_keyword = '+connection.escape(courseKeywordId), function(err, rows, fields) {
		if (err) throw err;  	
		var count = rows[0]['count'];
		callback(count == 0);
	});
}

exports.removeCourseKeywordById = function(id, callback) {
	connection.query('UPDATE course_keyword SET active = 0 WHERE id = '+connection.escape(id), function(err, result) {
		if (err) throw err;
		callback(result);
	});
}
