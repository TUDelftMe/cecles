function removeKeyword(keyword_id, course_id)
{
  $('#'+keyword_id +'').fadeOut(300, function() { $(this).remove(); });
  $.get( "../keyword/downvote/" + course_id + "/" + keyword_id);
}
