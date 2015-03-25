/**
 * New node file
 */

var Course = require('./../models/course');
var CourseKeyword = require('./../models/course_keyword');
var Article = require('./../models/article');
var Keyword = require('./../models/keyword');

exports.index = function(req, res){
	res.render('keyword', {
		title: 'Keywords'}
	);
};

exports.keyword = function(req, res){
	Keyword.getKeywordById(req.params.id, function(keyword) {
		Course.getCoursesByKeywordId(keyword.id, function(relevantCourses) {
			Article.getArticlesByKeywordId(keyword.id, function(articles) {
				Course.getCoursesByIds(req.user.courses, function(userCourses) {
					res.render('keyword', { 
						title: keyword.name,
						keyword: keyword,
						articles: articles,
						relevantCourses: relevantCourses,
						userCourses: userCourses,
            user: req.user.username});
				});
			});
		});
  });
};

exports.downvote = function(req, res){
	console.log(req.user.id);
	CourseKeyword.downvoteByUserIdCourseIdKeywordId(req.user.id, req.params.courseId, req.params.keywordId, function(result) {
		console.log(result); 
		res.end(JSON.stringify(result));
	});
};
