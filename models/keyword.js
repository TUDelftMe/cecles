/**
 * New node file
 */
var db = require('./../db');
var connection = db.connect();
var Course = require('./course');
var Keyword = require('./keyword');

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
