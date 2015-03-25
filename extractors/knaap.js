/**
 * New node file
 */
var Keyword = require('./../models/keyword.js');

Keyword.downvoteByUserIdCourseIdKeywordId(13,9,3, function(result) {
	console.log(result);
});