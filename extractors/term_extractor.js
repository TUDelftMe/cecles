/**
 * Extracts keywords from all courses in database using AlchemyAPI
 * and save keywords in database.
 */

var https = require('https');
var url = require('url');
var db = require('./../db')
var AlchemyAPI = require('./../apis/alchemyapi')
var alchemyapi = new AlchemyAPI();

connection = db.connect();

// Select all courses
var queryString = 'SELECT * FROM course';
connection.query(queryString, function(err, rows, fields) {
    if (err) throw err;
    
    rows.forEach(function(course) {
    	// Remove all current keywords from db
      var removeQueryString = 'DELETE FROM course_keyword WHERE id_course = '+course.id;
      connection.query(removeQueryString, function(err) {
      	if (err)
      		throw err;
      	else
      		// Call alchemy and save keywords as callback
      		callAlchemyAPITermExtractor(course.contents+" "+course.studygoals, course.id, saveKeywords);
      });
    });
});

/**
 * With the data from AlchemyAPI and the course of the id
 * check if the keyword already exists. If it does exist
 * save a new relation to the db. If it does not exist, first
 * create a new keyword and then save the relation.
 * @param data
 * @param id_course
 */
function saveKeywords(data, id_course) {
	var minRelevance = 0.25;
	
	if (data == null)
		return;
	
	data.forEach(function(keyword) {
		keyword.text = keyword.text.toLowerCase()
		if (keyword.relevance >= minRelevance) {
			var keyworddb = {name: keyword.text};

			console.log("Saving keyword '"+keyword.text+"' for course "+id_course+".");
			
			var queryString = "SELECT * FROM keyword WHERE name = "+connection.escape(keyword.text);
			var query = connection.query(queryString, function(err, rows, fields) {
				if (err)
					throw err;
				
				if (rows.length == 0)
					saveNewKeywordCourseRelation(keyworddb, id_course, keyword.relevance);
				else
					saveKeywordCourseRelation(rows[0].id, id_course, keyword.relevance);
			});
		}
	});
}

/**
 * Saves a new relation to the db between keyword and course
 * @param id_keyword
 * @param id_course
 */
function saveKeywordCourseRelation(id_keyword, id_course, relevance) {
	var keywordCourseRelation = {id_keyword: id_keyword, id_course: id_course, relevance: relevance};
	var query = connection.query('INSERT INTO course_keyword SET ?', keywordCourseRelation, function(err, result) {
		if (err)
			console.log(err);
	});
}

/**
 * Saves a new keyword to the db and then saves
 * the relation between the keyword and the course
 * @param keyword
 * @param id_course
 */
function saveNewKeywordCourseRelation(keyword, id_course, relevance) {
	connection.query('INSERT INTO keyword SET ?', keyword, function(err, result) {
		if (err)
			console.log(err);
		else
			saveKeywordCourseRelation(result.insertId, id_course, relevance);
	});
}

/**
 * Calls the AlchemyAPI for keyword extraction
 * @param text
 * @param callback
 * @param id_course
 */
function callAlchemyAPITermExtractor(text, id_course, callback) {
	console.log("Call AlchemyAPI Term Extractor with: "+ text.substr(0,20) +"...");
	alchemyapi.keywords('text', text, {  }, function(response) {
		if (response.status == 'ERROR')
			console.log(response.statusInfo);
		else
			callback(response['keywords'], id_course);
	});
}