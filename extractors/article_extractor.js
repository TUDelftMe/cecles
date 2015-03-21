/**
 * This script extracts articles from Wikipedia for all keywords
 */

var Article = require('./../models/article')
var Course = require('./../models/course')
var Keyword = require('./../models/keyword')
var Wikipedia = require('./../apis/wikipedia')

Keyword.getKeywords(function(keywords) {
	keywords.forEach(function(keyword) {
		Wikipedia.search(keyword.name, 3, function(articles) {
			articles.forEach(function(article) {
				article.id_keyword = keyword.id;
				console.log("Save article with title '"+article.title+"'.");
				Article.save(article);
			});
		});
	});
});