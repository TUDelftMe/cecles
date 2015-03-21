/**
 * New node file
 */

var Course = require('./../models/course');
var Article = require('./../models/article');
var Keyword = require('./../models/keyword');

exports.index = function(req, res){
	var courses = [];
	Course.getCoursesByIds(req.user.courses, function(userCourses) {
		Course.getRandomCourses(5, function(randCourses) {
			Keyword.getRandomKeywords(5, function(randKeywords) {
				Article.getRandomArticles(5, function(randArticles) {
					res.render('index', { 
						title: 'Welcome!', 
						userCourses: userCourses, 
						randCourses: randCourses,
						randKeywords: randKeywords,
						randArticles: randArticles,
						message: 'Hello there!', 
						user: req.user.username});
				});
			});
		});
	});
};

exports.login = function(req, res) {
    var alert_message= req.flash('error');
    var alert_exists = alert_message!='';
    res.render('login', { 
      title: 'Login',
      message: 'Login',
      alert_display: alert_exists,
      alert_message: alert_message,
      alert_type: "danger"
    });
};