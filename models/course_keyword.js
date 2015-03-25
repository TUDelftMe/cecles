/**
 * New node file
 */
var db = require('./../db');
var connection = db.connect();
var Course = require('./course');
var Article = require('./article');
var Keyword = require('./keyword');
var CourseKeyword = require('./course_keyword');

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
	connection.safe_query('UPDATE course_keyword SET active = 0 WHERE id = '+connection.escape(id), function(result) {
		callback(result);
	});
}

exports.downvoteByUserIdCourseIdKeywordId = function(userId, courseId, keywordId, callback) {
	CourseKeyword.getCourseKeywordByCourseIdKeywordId(courseId, keywordId, function(courseKeyword) {		
			var removeUserKeyword = {id_user: userId, id_course_keyword: courseKeyword.id};
			console.log(removeUserKeyword);
			CourseKeyword.userAllowedToVote(userId, courseKeyword.id, function(allowed) {
			if (allowed) {
				connection.query('INSERT INTO remove_user_keyword SET ?', removeUserKeyword, function(err, result) {
					if (err) throw err;
					connection.safe_query('SELECT COUNT(*) AS count FROM remove_user_keyword WHERE id_course_keyword = '+connection.escape(courseKeyword.id), function(rows, fields) {
						var count = rows[0]['count'];
						if (count >= 5) {
							CourseKeyword.removeCourseKeywordById(courseKeyword.id, function(result) {
								callback({error: 0, result: true});
							});
						}
						else {
							callback({error: 0, result: false});
						}
					});
				});
			}
			else {
				callback({error: 1, errorMessage: 'User already voted', result: false});
			}
		});
	});
};
