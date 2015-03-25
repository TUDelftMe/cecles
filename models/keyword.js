/**
 * New node file
 */
var db = require('./../db');
var connection = db.connect();
var Course = require('./course');
var Keyword = require('./keyword');
var CourseKeyword = require('./course_keyword');

exports.getKeywordById = function (id, callback) {
  Keyword.getKeywordsByIds([id], function (keywords) {
    if (keywords.length > 0)
      callback(keywords[0]);
    else
      callback({});
  });
};

exports.getKeywordsByIds = function (ids, callback) {
  connection.safe_query('SELECT * FROM keyword WHERE id IN (' + ids.join(',') + ')', function (rows, fields) {
    keywords = rows;
    callback(keywords);
  });
};

exports.getKeywords = function (callback) {
  connection.safe_query('SELECT * FROM keyword', function (rows, fields) {
    callback(rows);
  });
};

exports.getKeywordsByLikeName = function (name, callback) {
  var escapedName = connection.escape(name);
  connection.safe_query('SELECT * FROM keyword WHERE keyword.name LIKE "%' + escapedName.substring(1, escapedName.length - 1) + '%"', function (rows, fields) {
    callback(rows);
  });
};

exports.getKeywordsByCourseId = function (courseId, callback) {
  Keyword.getKeywordsByCourseIds([courseId], function (keywords) {
    callback(keywords);
  });
};

exports.getKeywordsByCourseIds = function (courseIds, callback) {
  connection.safe_query('SELECT k.*, ck.relevance FROM course_keyword AS ck LEFT JOIN keyword AS k ON k.id = ck.id_keyword WHERE ck.id_course IN (' + courseIds.join(',') + ')', function (rows, fields) {
    keywords = rows;
    callback(keywords);
  });
};

exports.getRandomKeywords = function (limit, callback) {
  connection.safe_query('SELECT * FROM keyword ORDER BY RAND() LIMIT ' + connection.escape(limit), function (keywords, fields) {
    callback(keywords);
  });
};

exports.removeKeywordById = function(id, callback) {
	connection.safe_query('UPDATE course_keyword SET active = 0 WHERE id_keyword = '+connection.escape(id), function(err, result) {
		if (err) throw err;
		callback(result);
	});
};

exports.downvoteByUserIdCourseIdKeywordId = function(userId, courseId, keywordId, callback) {
	CourseKeyword.getCourseKeywordByCourseIdKeywordId(courseId, keywordId, function(courseKeyword) {		
			var removeUserKeyword = {id_user: userId, id_course_keyword: courseKeyword.id};
			CourseKeyword.userAllowedToVote(userId, courseKeyword.id, function(allowed) {
			if (allowed) {
				connection.safe_query('INSERT INTO remove_user_keyword SET ?', removeUserKeyword, function(err, result) {
					if (err) throw err;
					connection.safe_query('SELECT COUNT(*) AS count FROM remove_user_keyword WHERE id_course_keyword = '+connection.escape(courseKeyword.id), function(err, rows, fields) {
						if (err) throw err;  	
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
