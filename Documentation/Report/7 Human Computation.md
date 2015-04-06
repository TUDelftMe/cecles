# Human Computation in CECLES
This chapter is dedicated to the description of the human computation element in CECLES. A partial aim of the system is relevancy, which is a subjective term **[source]**. Therefore, human feedback is required in the system to provide measurements of the relevancy.

In CECLES, there are two measures of relevancy which require human computation: the relevancy of a keyword for a specific course and the relevancy of study material for a specific keyword. 

As derived from the goal of CECLES, solely the most relevant results should be presented to the user of the system.

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
CrowdFlower is a human computation platform which provides services such as sentiment analysis, relevance tuning and content moderation or custom designed services which can be asked to broad or very specific 'contributors' (the people executing the tasks) [source](http://www.crowdflower.com/overview). 

The design of the feedback scheme at CrowdFlower needs to be more specific than with the teachers or the students since the incentive here is not, respectively, intrinsic motivation or use of the system. The incentive is financial reward. 

The task given to CrowdFlower will be: 
> "Is this keyword a good reflection in the contents of the course described above?"

this question has the limitation of being very dependent on the course guide description.


## Search result relevance
After determining relevant keywords for the courses, these keywords are used to search for study material. The IR components of such retrieval is described in chapter **[verwijzing]**. However, not only accurate, but also relevant materials are required which, again, requires human computation.

The search result relevance is given an initial value after which users can provide implicit and explicit user feedback **[reference to chapter 3]**. The explicit feedback is given by asking for a rating of the material (e.g. thumbs up- or down). The implicit feedback is given by tracking click- and bounce rates though the material.

## CrowdFlower task
To show test the applicability of CrowdFlower as a tool for rating the keywords we have created a task in CrowdFlower for a few, randomly selected courses.

### Job building
The job would have the following title and instructions:


> **Title:** Does the keyword represent the course contents?

> **Instructions:** To help label course descriptions for a university, you are provided with course descriptions and several keywords that have been extracted from this description. Please rate  whether the keyword is a good representation of the course contents

The worker would then be presented with the full text course guide description and the study goals and would have rate how well a keyword reflects the contents of the course.

**image of CF question **

### Test questions
To make sure that only competent workers can contribute, test questions have been built in. 
These were of the same structure as the keyword questions, but contained the course name instead of a keyword. 
The assumption was made here that the name of the course would very well reflect the contents of the course and thus workers would have to grade this question with a 4 or 5 in order to pass.

### Job Settings
The final step before launching is the settings of the job. To stay withing a low-budget, only 12 courses with each 7 keywords have been tested by 3 workers each. The job costs $8 total, which was within our $10 dollar budget we provided to CrowdFlower.

### Rating of workers
The workers behind CrowdFlower also had the ability to indicate their satisfaction about the job. The feedback was generally O.K. with an overall 3.9 out of 5. The worst sub-score was on the 'ease of job', which received 3.4 out of 5. 

**Image CF_contributor_rating.png **

### Results
The result from the task are presented as the average score on a keyword followed by the variance on that score. The image below is an illustration of such a result. The first column is the score on keyword 1 of a course, the second the variance of the score. Every row is a different course.

**image: CF_results.png **

### Conclusion of CrowdFlower
The results from CrowdFlower seem pretty alright but might need to be correlated to the relevancy scores retrieved from the AlchemyAPI to see if there is truly new information in doing the human computation. 
The task was rated alright by the workers contributing to the task, however, at the total cost of $8 for just a fraction of the total keywords, rating all keywords this way is quite expensive.



## stuff - vooral theorie
______
Based on Law, E., & Ahn, L. V. [2011][1], the central aspects of human computation are explained in the next sections.

The 'how, what and who' of human computation 

* On human computation
* 
* goal of human computation in CECLES: Determinate relevancy
* end users (students), teachers and CrowdFlower
 * 'wisedom of masses vs. experts'


[1] Law, E., & Ahn, L. V. (2011). Human computation. Synthesis Lectures on Artificial Intelligence and Machine Learning, 5(3), 1-121.