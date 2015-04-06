# Human Computation in CECLES
This chapter is dedicated to the description of the human computation element in CECLES. A partial aim of the system is relevancy, which is a subjective term **[source]**. Therefore, human feedback is required in the system to provide measurements of the relevancy.

In CECLES, there are two measures of relevancy which require human computation: the relevancy of a keyword for a specific course and the relevancy of study material for a specific keyword. 

As derived from the goal of CECLES, solely the most relevant results should be presented to the user of the system.. 

## Keyword relevance
This section builds on the keyword pipeline previously discussed in chapter **[link]**. The keywords receive a computed relevancy from the AlchemyAPI algorithm based on the source of extraction (e.g. the course description). 
This relevancy is treated as 'base' relevancy and improved by three instances of human feedback: a moment of feedback by the teacher(s) of the course, a feedback by the students enrolled in the course and 'human computation'.

### Expert feedback: professor/ teacher
The teacher is assumed to have an interest in the course and providing good and relevant study material for his or her students. As a result, the teacher is able to provide feedback on whether the keywords extracted and ranked from the course description correctly represent the course as he or she teaches it. This feedback is considered to be expert feedback and is rated higher than other feedback but at the same time there is a limited amount of people able to provide this feedback.

### User feedback: students
The second group of people able to provide feedback on the keywords are the students. For this group, the following is assumed: First, students have a low interest in providing direct and detailed feedback. Second, the students enrolled in the same course are homogeneous in their study needs, which results in the same definition of for each student of a course. Finally, students want a working system to work with. 

Based on the assumptions the feedback design for the students is as follows: students are presented the top keywords for a course and have the ability to remove keywords from their view. This 'removal' is interpreted by the system as a downgrade in relevancy.

Also, based on the final assumption, at least one round of human feedback other than the user feedback is required before students are willing to use the system. Such a 'cold-boot' must be done by the expert feedback or the human computation of CrowdFlower.

### Human computation: CrowdFlower
Crowdflower is a human computation platform which provides services such as sentiment analysis, relevance tuning and content moderation or custom designed services which can be asked to broad or very specific 'contributors' (the people executing the tasks) [source](http://www.crowdflower.com/overview). 

The design of the feedback scheme at CrowdFlower needs to be more specific than with the teachers or the students since the incentive here is not, respectively, intrinsic motivation or use of the system. The incentive is financial reward. 





Based on Law, E., & Ahn, L. V. [2011][1], the central aspects of human computation are explained in the next sections.

The 'how, what and who' of human computation 

* On human computation
* 
* goal of human computation in CECLES: Determinate relevancy
* end users (students), teachers and CrowdFlower
 * 'wisedom of masses vs. experts'


* HC competent
	* Crowdflower
	* End users

> the goal of CECLES is to quickly provide accurate and relevant study materials for the topics given in a course.



[1] Law, E., & Ahn, L. V. (2011). Human computation. Synthesis Lectures on Artificial Intelligence and Machine Learning, 5(3), 1-121.