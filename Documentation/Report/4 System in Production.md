# System in Production


## Design of Cecles

This section describes the design of Cecles. This design includes the visual and the information design. Because the application is built incrementally, the first design was a light, easy to communicate design. After the concept was clear the production and design went hand in hand resulting in less preliminary explicit designs.


### Visual design
The mock-ups below show the initial visual design of the application. These mock-ups helped to get a first feeling on the UI of the application and to communicate the first stage of the application.
![Result page](../Diagrammen/mockup-result page.png "mockup result page")

![Login](../Diagrammen/CECLES-login mockup.png "Login Celces")
As can be seen in the remainder of this chapter, the actual design differs from this visual. This was indeed not the purpose of the mock-ups as we aimed for a good usability with proper functions instead of a focus on design.

## Information Flow
An overview of the basic information flow in CECLES can be found in the next chapter. Also future functionalities are addressed, which are elaborated in future work and the remainder of the report. 

![Information flow](../Diagrammen/information_flow.png "Information flow")
This diagram describes an early design. Although not all functionalities with the eventually established requirements, it gives a clear overview of the information structure of the application.

### TU Delft API
The main source of information is the [TU Delft API](http://apidoc.tudelft.nl/). From this source the system extracts both the courses and users. From every course some basic textual in- formation can be retrieved as well as which user is enrolled in which course. From the basic textual information from each course the system will extract the main terms which results in topics relevant for each course. These topics can be used to search other sources.

### Wikipedia API
The [Wikipedia API](http://www.mediawiki.org/wiki/API:Main_page) enables CECLES to find relevant pages for the course. Again the topics extracted from the course information can be used for this matter.

### Coursera API
The [Coursera Catalog APIs](https://tech.coursera.org/app-platform/catalog/) expose the list of courses, instructors and universities available on the Coursera platform. These APIs are available publicly without authentication over the Internet. These APIs are still beta and can change in backwards-incompatible ways without warning.

### CollegeRama
Some lectures at TU Delft are recorded to give students the possibility to watch the lecture online. From the information found at the TU Delft API we can easily connect these lectures to the courses by their course identifier.

### YouTube API
The [YouTube API](https://developers.google.com/youtube/v3/) enables the system to quickly search through YouTube videos in their description, keywords. For these searches the topics found with the textual analysis of the course will be used. Unfortunately it is not possible to search through subtitles, but these could be used for further analysis. Since we want to index the videos with CrowdFlower, we will need to split the video in smaller parts.


### GoogleScholar
Google Scholar does not have an API, but several alternatives (even unofficial API’s) can be found on the online. For example, a parser for the output of Google Scholar is available on [icir](http://www. icir.org/christian/scholar.html). This enables the system to retrieve relevant papers with the topics belonging to the course.

The system will retrieve and compute all information as mentioned above on beforehand and save it in the database so it can be quickly searched through according to the extracted topics per course.



## How Cecles works

### Authentication

![Home/Login](../VisualizationApp/0 home login SS.png "Login page")

The Authentication should be done by Oauth. In the working example the login is done with a sample login. When the Oauth login works, the student automatically sees the courses he or she is enrolled in and can directly search for extra content

### Welcome 

![Home page](../VisualizationApp/6 Welkom screen SS.png "Welcome")

After login already suggestions are made on courses, topic and relating sources. Also the user can scroll through his or her courses and search on topics.

### Course Information

![Course Inormation](../VisualizationApp/1 Course info SS.png "Course information page")

The course page contains the description and study goals extracted from the TU api. The keywords are then extracted from the course guide. For now the user has the possibility to rate the keywords as irrelevant. Further analysis can result in adding a positive rating as well

### Keywords

![Keywords](../VisualizationApp/2 Keywords SS.png "Keywords section")

![Keywords interactive](../VisualizationApp/8 keywords SS.png "Keywords section")
The keywords are extracted from the courses as described in the system analysis. The keywords are graded by relevance as shown in the first screen shot (the relevance model is described in the system analysis chapter). The second screen shot shows the keywords as presented to the user in the application. 

### Search

![Search example](../VisualizationApp/3 Search results Brownian motion SS.png "Search example")

![Study materials](../VisualizationApp/4 Brownian motion - wi4202 SS.png "Study materials within course")

When a student needs information on a particular topic, he or she can search directly on a keyword. All relevant courses and materials are shown.

### Results

![Example wiki page](../VisualizationApp/5 WIKI brownian motion SS.png "Wikipedia page: result from a course")

![Example wiki page](../VisualizationApp/7 coursera SS.png "Wikipedia page: result from a course")
Students can consult different resources. From wikipedia for a quick explaination to a Coursera course for a profound exploration.

## Differences design and actual application
BESCHRIJVING VERSCHILLEN

## Future work
### Video segmentation

#### Simple heuristic segmentation
The segmentation of videos can be indexed by simple heuristics. Such a simple heuristic may be: under 5 minutes, do no segmenting and between 5 and 10 minutes cut the video in two parts, above 10 minutes in three same length parts and so on. The advantage of this method is its simplicity. However, with this method there is no assurance only one topic is addressed within a segment.

#### Scene detection within videos
Another option is to do operations on the video itself. There are multiple algorithms to do scene detection within videos [[1][1]]. The advantage is that results will probably be better than the simple heuristic method. The disadvantage is implementing this method will take a lot of time and the calculations are costly in terms of resources.

#### Detection by CrowdFlower user
The last option is to let the CrowdFlower user do the segmentation. When a user is well known to the topics, this would be a good option. However, as we are not sure about the knowledge of these users we dislike this option. Also, this option would make the user interface for the CrowdFlower users more difficult.
	
Based on above considerations, we have decided to use the simple heuristic segmentation.

[1] C.-W. Ngo, Y.-F. Ma, and H.-J. Zhang, Video summarization and scene detection by graph modeling, Cir- cuits and Systems for Video Technology, IEEE Transactions on 15, 296 (2005).
