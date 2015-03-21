/**
 * New node file
 */

var Course = require('./../models/course');
var Article = require('./../models/article');
var Keyword = require('./../models/keyword');

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
	var courses = [];
  req.getConnection(function(err,connection) {
  	Course.getCourseById(req.params.id, function(course) {
    	Course.getCoursesByIds(req.user.courses, function(userCourses) {
      	Keyword.getKeywordsByCourseId(course.id, function(keywords) {
      		Article.getArticlesByCourseId(course.id, function(articles) {
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
