/**
 * New node file
 */

var Course = require('./../models/course');
var Article = require('./../models/article');
var Keyword = require('./../models/keyword');
var request = require('request');

exports.index = function(req, res){
	var courses = [];
  req.getConnection(function(err,connection){
  	Course.getCoursesByIds(req.user.courses, function(userCourses) {
  		Course.getCourses(function(allCourses) {
	  		res.render('course', { 
	  			title: 'Courses', 
    			userCourses: userCourses, 
    			allCourses: allCourses, 
	  			user: req.user.username});
  		});
	  });  
	});
};

exports.course = function(req, res){
  req.getConnection(function(err,connection) {
  	Course.getCourseById(req.params.id, function(course) {
    	Course.getCoursesByIds(req.user.courses, function(userCourses) {
      	Keyword.getKeywordsByUserIdCourseId(req.user.id, course.id, function(keywords) {
      		Article.getArticlesByUserIdCourseId(req.user.id, course.id, function(articles) {
      			for (var i in keywords) {
      				var font_min = 10;
      				var font_max = 20;
      				var relevance = (keywords[i].relevance - 0.5) / 0.5;
      				keywords[i].fontsize = font_min + ((font_max - font_min) * relevance);
      			}
	      		res.render('course', { 
	      			title: course.name,
	      			keywords: keywords, 
	      			userCourses: userCourses, 
	      			course: course, 
	      			articles: articles.slice(0,19),
	      			user: req.user.username});
      		});
      	});
      });
  	});  
  });
};
