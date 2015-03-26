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
    if (keywords.length == 0)
      callback({});
    else
      callback(keywords[0]);
  });
};

exports.getKeywordsByIds = function (ids, callback) {
  connection.safe_query('SELECT * '+
  		'FROM keyword '+
  		'WHERE id IN (' + ids.join(',') + ')', function (rows, fields) {
    callback(rows);
  });
};

exports.getKeywords = function (callback) {
  connection.safe_query('SELECT * '+
  		'FROM keyword', function (rows, fields) {
    callback(rows);
  });
};

exports.getKeywordsByLikeName = function (name, callback) {
  var escapedName = connection.escape(name);
  connection.safe_query('SELECT * '+
  		'FROM keyword '+
  		'WHERE keyword.name LIKE "%' + escapedName.substring(1, escapedName.length - 1) + '%"', function (rows, fields) {
    callback(rows);
  });
};

exports.getKeywordsByCourseId = function (courseId, callback) {
  Keyword.getKeywordsByCourseIds([courseId], function (keywords) {
    callback(keywords);
  });
};

exports.getKeywordsByUserIdCourseId = function (userId, courseId, callback) {
  Keyword.getKeywordsByUserIdCourseIds(userId, [courseId], function (keywords) {
    callback(keywords);
  });
};

exports.getKeywordsByCourseIds = function (courseIds, callback) {
  connection.safe_query('SELECT k.*, ck.relevance '+
  		'FROM course_keyword AS ck '+
  		'LEFT JOIN keyword AS k ON k.id = ck.id_keyword '+
  		'WHERE ck.active = 1 '+
  			'AND ck.id_course IN (' + courseIds.join(',') + ')', function (rows, fields) {
    keywords = rows;
    callback(keywords);
  });
}

exports.getKeywordsByUserIdCourseIds = function (userId, courseIds, callback) {
  connection.safe_query('SELECT k.*, ck.relevance '+
  		'FROM course_keyword AS ck '+
  		'LEFT JOIN keyword AS k ON k.id = ck.id_keyword '+
  		'LEFT JOIN remove_user_keyword AS ruk ON ruk.id_course_keyword = ck.id '+
  			'AND ruk.id_user = '+connection.escape(userId)+' '+
  		'WHERE ck.id_course IN (' + courseIds.join(',') + ') '+
  			'AND (ruk.id_user != '+connection.escape(userId)+' OR ruk.id_user IS NULL) '+
  			'AND ck.active = 1 '+
  		'GROUP BY k.id', function (rows, fields) {
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
	connection.safe_query('UPDATE course_keyword SET active = 0 WHERE id_keyword = '+connection.escape(id), function(result) {
		callback(result);
	});
};
