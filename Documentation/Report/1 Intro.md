#Introduction

## What is Cecles
Cecles, the Collaborative Enriched Course Learning Experience System, is a platform for students that provides instant access to relevant information sources when studying for a course. It provides a customized environment for TU Delft students to quickly access all relevant course material on popular educational sites such as Wikipedia, Google Scholar, the TU Delft Collegerama and educational video channels on YouTube. 
The aim of the system is to reduce the time spent on searching for relevant course materials in different sources, a process which is known to be highly distracting to many students.

## Why Cecles
The learning system answers to a student’s need for information about topics of the course a student is enrolled in. It is built on the assumption that students like to consult a variety of sources when learning, such as the information given by the teacher as part of the course, recorded lectures of the course and as well as external sources like Wikipedia articles and educational videos on YouTube. Furthermore, we assume that students in a course have a homogeneous study information need and that the individual search operations are therefore redundant.
CECLES bundles these redundant search operations: Each time a student has a need for information on a topic, a search query is submitted throughout multiple systems. CECLES offers the results from multiple sources with its own customized search functionality.

## Challenges
In order for students to use this platform, it should provide a Pareto improvement on either time or relevance compared to the current situation. In other words, the platform should provide results that are more precise and have a higher recall <!-- relevant ? --> within less time compared to a student using the search options of every individual source.

*********** UITBREIDEN *************

## An information retrieval system
"Retrieving relevant information is one of the central activities in modern knowledge-driven societies. The real value of the Web can only be unlocked if the huge amount of available data can be found, analysed, and exploited so that each user can quickly find information that is both relevant and comprehensive for their needs." ([Bozzon, 2015](https://blackboard.tudelft.nl/webapps/portal/ frameset.jsp?tab_tab_group_id=_10_1/))

The same goes for retrieving course material and additional information related to courses. The following steps are used for the information retrieval part. This will result in study information that can be quickly found and is both relevant and comprehensive for their needs.
* Derive main topics of courses from TUDelft API from, for example, description and study goals
* Analyze course topics with term extraction
* Finding similarities between courses and clustering of courses with similar topics
* Retrieving information of Collegerama by analyzing the accessory slides and segment the lectures by topic
* Retrieving related information from external sources such as: YouTube, Wikipedia and Google Scholar
* Segmentation of YouTube videos


************* Updaten op huidig systeem ***********