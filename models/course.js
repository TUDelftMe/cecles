/**
 * New node file
 */
var db = require('./../db');
var connection = db.connect();
var Course = require('./course');
var Article = require('./article');
var Keyword = require('./keyword');

exports.getCourseById = function(courseId, callback) {
	Course.getCoursesByIds([courseId], function(courses) {
		if (courses.length > 0)
			callback(courses[0]);
		else
			callback({});
	});
}

exports.getCoursesByIds = function(courseIds, callback) {
	connection.query('SELECT * FROM course WHERE id IN ('+courseIds.join(',')+')', function(err, rows, fields) {
		if (err) throw err;  	
		callback(rows);
	});
}

exports.getCoursesByKeywordId = function(keywordId, callback) {
	Course.getCoursesByKeywordIds([keywordId], function(courses) {
		callback(courses);
	});
}

exports.getCoursesByKeywordIds = function(keywordIds, callback) {
	connection.query('SELECT DISTINCT c.id, c.*, ck.relevance FROM course_keyword AS ck LEFT JOIN course AS c ON c.id = ck.id_course WHERE ck.id_keyword IN ('+keywordIds.join(',')+')', function(err, rows, fields) {
		if (err) throw err;  		
		courses = rows;
		callback(courses);
	});
}

exports.getCourses = function(callback) {
	connection.query('SELECT * FROM course', function(err, rows, fields) {
		if (err) throw err;  		
		callback(rows);
	});
}

exports.getRandomCourses = function(limit, callback) {
	connection.query('SELECT * FROM course ORDER BY RAND() LIMIT '+connection.escape(limit), function(err, courses, fields) {
		callback(courses);
	});
}