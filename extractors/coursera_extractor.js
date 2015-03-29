/**
 * This script extracts articles from Wikipedia for all keywords
 */
//var http = require('http');
var Coursera = require('./../models/coursera');
var Keyword = require('./../models/keyword');
var request = require('request');
var https = require('https');
//http.globalAgent.maxSockets = 100000;

Keyword.getKeywords (function (keywords) {
  Keyword.iterateKeywords(keywords,0);
});

Keyword.iterateKeywords = function (keywords,i){
  setTimeout(function () {
    Keyword.performRequest(keywords[i]);
    if(i < keywords.length){
      Keyword.iterateKeywords(keywords,i+1);
    }
  }, 1000);
};

Keyword.performRequest = function (keyword) {
  https.get('https://api.coursera.org/api/catalog.v1/courses?q=search&query=' + keyword.name, function (res) {
    // explicitly treat incoming data as utf8 (avoids issues with multi-byte chars)
    res.setEncoding('utf8');

    // incrementally capture the incoming response body
    var body = '';
    res.on('data', function (d) {
      body += d;
    });

    // do whatever we want with the response once it's done
    res.on('end', function () {
      try {
        var parsed = JSON.parse(body);
      } catch (err) {
        console.error('Unable to parse response as JSON', err);
        return console.log(err);
      }

      var elements = parsed.elements;
      for (var i in elements) {
        var course = {};
        course.course_name = elements[i].name;
        course.course_short_name = elements[i].shortName;
        course.keyword_id = keyword.id;
        Coursera.save(course);
        console.log("Saving course with title '" + course.course_name + "'.");
      }
    });
  }).on('error', function (err) {
    // handle errors with the request itself
    console.error('Error with the request:', err.message);
    console.log(err);
  });
};