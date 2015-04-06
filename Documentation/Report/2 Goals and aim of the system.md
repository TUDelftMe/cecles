# Goals and aim of the system

## Stakeholder analysis
In the stakeholder analysis all individuals and groups that are affected by CECLES are described and their relationship with the CECLES project is explained.
The main stakeholders in this project are:
* Delft University of Technology 
* Professors
* Students
* YouTube
* Wikipedia
* Collegerama

In the Stakeholder Map below, a relative relation between interest and influence between individual stakeholders is shown. From this figure the relative importance of each stakeholders needs can be roughly determined.

******** STAKEHOLDERDIAGRAM UIT REPORT ***************

The TU Delft as an organization has most power and a fair interest in the system. Student from the university have most interest. The system however, can be interesting for non-students as well, regarding to the open course development of the TU for example. 
The sources that are used have very little interest in the system itself but are important for the system since they provide (free) access to the data used.

## Requirements 
The requirements are set up using the MoSCoW method which follows RFC2119. The requirements are set up as must haves, should haves, could haves and would haves.

### Must haves
The must haves describes requirements that must be satisfied in the final system to achieve success
* The application must have all the up-to-date course guide information
* The application must extract relevant keywords from the course guide with a satisfying precision and recall
* The application must have the ability to compare the content of different courses
* The application must efficiently connect with Wikipedia to give information regarding specific topics

### Should haves
The should haves represent requirements that have a high-priority and should be included in the system if possible. These requirements are critical but can be satisfied in other ways if strictly necessary.
* The application should collect Collegerama lecture information
* The application should collect information from YouTube videos
* The application should link the course content to a particular video fragment and other (external) material
* The application should support tags gained from lectures
* The application should provide video fragments that can be assessed by CrowdFlower users to tag
those
* Other lectures should be recommended by making use of tags and the course guide

### Could haves
The could haves consist of requirements that are desirable but not necessary. This will be included if time and resources permit.
* An extended search functionality could be available
* The application could provide a place to ask course related questions and get closely related videos at specific parts
* The materials could have references to other lectures or course materials
* A student could be able to request notes or materials
* The application could have the ability to merge lectures of different years and could identify changes over time



## Non functional requirements
### Must haves
* CECLES should be fast and responsive

### Should haves
* The interface should be appealing to the user
* The interface should be intuitive
* The interface should be clean and concise
* The courses feedback and resources should be easy to find

### Could haves
* The system could be secure.
* The system could be stable.
* The system could be easily operable for system administrators.

### Would haves
* The system solely works for the TUDelft, it would be nice to make it portable to different universities or communities.

The system should be clean and concise: the constraints that comes with this requirement is further explained in the system analysis chapter. 
Security is of course a important issue when working with personal information. The system however, is considered to already have a safe login (working with the TU API). 
The security is, for now, less important since all sources used are public sources. 
Stability is in this phase less important. A little downtime is not such an issue. However, when widely used, it should handle peak load during examination periods.



## Use cases