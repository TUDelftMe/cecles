/**
 * New node file
 */

var Course = require('./../models/course');
var Article = require('./../models/article');
var Keyword = require('./../models/keyword');

exports.index = function(req, res){
	var courses = [];
  req.getConnection(function(err,connection){
  	Course.getCoursesByIds(req.user.courses, function(courses) {
	  		res.render('search', { 
	  			title: 'Search', 
	  			courses: courses, 
	  			user: req.user.username});
	  });  
	});
};

exports.result = function(req, res){
  req.getConnection(function(err,connection) {
    	Course.getCoursesByIds(req.user.courses, function(userCourses) {
    Keyword.getKeywordsByLikeName(req.body.query,function(keywords){
      res.render('search', { 
        title: 'Search', 
        results: keywords,
        userCourses: userCourses,
        user: req.user.username});
    });
  });
});
};


