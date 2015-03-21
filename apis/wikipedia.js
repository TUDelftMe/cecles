/**
 * Wikipedia API
 */
var bot = require('nodemw');
var Wikipedia = require('./wikipedia');
var db = require('./../db');
var removeDiacritics = require('diacritics').remove;
var connection = db.connect();
var url = 'en.wikipedia.org';

var client = new bot({
  server: url,  // host name of MediaWiki-powered site
  path: '/w',                  // path to api.php script
  debug: false                 // is more verbose when set to true
});

/**
 * Returns an array with articles in form {title}
 * @param search - string to search for
 * @param limit - max number of articles
 * @param callback - function
 */
exports.search = function(search, limit, callback) {
	console.log("Wikipedia search for '"+search+"' with limit "+limit+".");
	client.search(search, function(err, data) {
	  if (err) 
	  	throw err
	  	
	  var newData = [];
	  for (i in data) {
	  	newData[i] = {title: removeDiacritics(data[i].title)}
	  	if (i == limit - 1) break;
	  }
	  callback(newData);
	});
}

/**
 * Returns the raw text of an article
 * @param pageTitle - string page title
 * @param callback - function
 */
exports.getArticleByPageTitle = function(pageTitle, callback) {
	client.getArticle(pageTitle, function(err, data) {
	  if (err) 
	  	throw err
	  	
	  callback(data);
	});
}