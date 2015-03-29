/**
 * Coursera model
 */
var db = require('./../db');
var connection = db.connect();
var Coursera = require('./coursera');
var Course = require('./course');
var Keyword = require('./keyword');

exports.save = function(coursera, callback) {
	connection.safe_query('INSERT INTO coursera SET ?', coursera, function(safe_query, result) {
		if (callback)	callback(result);
	});

};

exports.getCourseraById = function(courseraId, callback) {
	Coursera.getCourserasByIds([courseraId], function(courseras) {
		if (courses.length > 0)
			callback(courseras[0]);
		else
			callback({});
	});
};

exports.getCourserasByIds = function(courseraIds, callback) {
	if (courseraIds.length == 0)
		callback([]);
	else {
		connection.safe_query('SELECT * FROM coursera WHERE id IN ('+courseraIds.join(',')+')', function(courseras, fields) {
			for (var i in courseras) courseras[i].url = Coursera.getUrl(courseras[i].short_name);
			callback(courseras);
		});
	}
};

exports.getCourserasByKeywordId = function(keywordId, callback) {
	Coursera.getCourserasByKeywordIds([keywordId], function(courseras) {
		callback(courseras);
	});
};

exports.getCourserasByKeywordIds = function(keywordIds, callback) {
	if (keywordIds.length == 0)
		callback([]);
	else {
		connection.safe_query('SELECT * FROM coursera WHERE keyword_id IN ('+keywordIds.join(',')+')', function(courseras, fields) {
			for (var i in courseras) courseras[i].url = Coursera.getUrl(courseras[i].course_short_name);
			callback(courseras);
		});
	}
};

exports.getRandomCourseras = function(limit, callback) {
	connection.safe_query('SELECT * FROM coursera ORDER BY RAND() LIMIT '+connection.escape(limit), function(courseras, fields) {
		callback(courseras);
	});
};

exports.getUrl = function(course_short_name) {
	return "https://www.coursera.org/course/" + course_short_name;
};

exports.getCourserasByCourseId = function(courseId, callback) {
	Keyword.getKeywordsByCourseId(courseId, function(keywords) {
		var keywordIds = [];
		for (i in keywords) keywordIds[i] = keywords[i].id;
		Coursera.getCourserasByKeywordIds(keywordIds, function(courseras) {
			callback(courseras);
		});
	});
};

exports.getCourserasByUserIdCourseId = function(userId, courseId, callback) {
	Keyword.getKeywordsByUserIdCourseId(userId, courseId, function(keywords) {
		var keywordIds = [];
		for (i in keywords) keywordIds[i] = keywords[i].id;
		Coursera.getCourserasByKeywordIds(keywordIds, function(courseras) {
			callback(courseras);
		});
	});
};

exports.getCourserasByUserIdCourseId = function(userId, courseId, callback) {
	Keyword.getKeywordsByUserIdCourseId(userId, courseId, function(keywords) {
		var keywordIds = [];
		for (i in keywords) keywordIds[i] = keywords[i].id;
		Coursera.getCourserasByKeywordIds(keywordIds, function(courseras) {
			callback(courseras);
		});
	});
};
