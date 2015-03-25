/**
 * Article model
 */
var db = require('./../db');
var connection = db.connect();
var Course = require('./course');
var Article = require('./article');
var Keyword = require('./keyword');

exports.save = function(article, callback) {
	connection.safe_query('INSERT INTO article SET ?', article, function(safe_query, result) {
		if (callback)	callback(result);
	});
};

exports.getArticleById = function(articleId, callback) {
	Article.getArticlesByIds([articleId], function(articles) {
		if (courses.length > 0)
			callback(articles[0]);
		else
			callback({});
	});
};

exports.getArticlesByIds = function(articleIds, callback) {
	if (articleIds.length == 0)
		callback([]);
	else {
		connection.safe_query('SELECT * FROM article WHERE id IN ('+articleIds.join(',')+')', function(articles, fields) {
			for (var i in articles) articles[i].url = Article.getUrl(articles[i].title);
			callback(articles);
		});
	}
};

exports.getArticlesByKeywordId = function(keywordId, callback) {
	Article.getArticlesByKeywordIds([keywordId], function(articles) {
		callback(articles);
	});
};

exports.getArticlesByKeywordIds = function(keywordIds, callback) {
	if (keywordIds.length == 0)
		callback([]);
	else {
		connection.safe_query('SELECT * FROM article WHERE id_keyword IN ('+keywordIds.join(',')+')', function(articles, fields) {
			for (var i in articles) articles[i].url = Article.getUrl(articles[i].title);
			callback(articles);
		});
	}
};

exports.getRandomArticles = function(limit, callback) {
	connection.safe_query('SELECT * FROM article ORDER BY RAND() LIMIT '+connection.escape(limit), function(articles, fields) {
		callback(articles);
	});
};

exports.getUrl = function(articleTitle) {
	return "http://en.wikipedia.org/wiki/"+articleTitle.replace(" ", "_");
};

exports.getArticlesByCourseId = function(courseId, callback) {
	Keyword.getKeywordsByCourseId(courseId, function(keywords) {
		var keywordIds = [];
		for (i in keywords) keywordIds[i] = keywords[i].id;
		Article.getArticlesByKeywordIds(keywordIds, function(articles) {
			callback(articles);
		});
	});
};
