var request = require('request')
var cheerio = require('cheerio')
var querystring = require('querystring')
var util = require('util')
var sleep = require('sleep')

var URL = 'http://www.google.%s/search?hl=%s&q=%s&start=%s&sa=N&num=%s&ie=UTF-8&oe=UTF-8'

function google (query, callback) {
  igoogle(query, 0, callback)
}

google.resultsPerPage = 10
google.tld = 'com'
google.lang = 'en'
google.requestOptions = {}

var igoogle = function (query, start, callback) {
	console.log("iGoogle");
  if (google.resultsPerPage > 100) google.resultsPerPage = 100 // Google won't allow greater than 100 anyway

  var newUrl = util.format(URL, google.tld, google.lang, querystring.escape(query), start, google.resultsPerPage)
  var requestOptions = {
    url: newUrl,
    method: 'GET'
  }

  for (var k in google.requestOptions) {
    requestOptions[k] = google.requestOptions[k]
  }

  request(requestOptions, function (err, resp, body) {
  	console.log("request!");
    if ((err == null) && resp.statusCode === 200) {
      var $ = cheerio.load(body)
      var total = $('div#resultStats').text().substr(6);
      total = parseInt(total.substr(0, total.length - 8).replace(/,/g,''));
      callback(null, total);
    } 
    else {
    	console.log("komtie aan");
      callback(new Error('Error on response' + (resp ? ' (' + resp.statusCode + ')' : '') + ':' + err + ' : ' + body), null)
    }
  });
};

module.exports = google