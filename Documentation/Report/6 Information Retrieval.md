# Information Retrieval
This chapter takes a more theoretical view on the IR processes that are included in CECLES to support the system analysis and the application description.

## AlchemyAPI
CECLES uses the AlchemyAPI early on for the extraction of terms from the course guide. Although easily implemented and bringing back useful results, the Alchemy is a proprietary system and does not disclose exactly which algorithms are used. 
However, from the description it is possible to assume that Alchemy performs semantic analysis of text and tokenization. It also has a 'relevancy score' from 0 to 1 for each keyword extracted which is based on the text analyzed. Yet this the algorithm computing this score is, like before, a black box [AlchemyAPI][1].

## Stemming
Stemming, the process by which words are reduced to their stem, is currently not implemented in CECLES. 
The system could benefit from such an implementation since some keywords in CECLES are a more specific instance of another keyword (e.g. "self-adjoint operators" and "unbound self-adjoint operators"). 
These keywords are partially overlapping in their representation of the course contents.
However, implementing such stemming might reduce specificity of a keyword and therefore reduce the relevancy of later retrieved study material. 
This is a dilemma which needs to be resolved though trial-and-error with user feedback.

## Recommender system
The recommender system, although not implemented in this version, will suggest additional courses one can follow. The first step will be to implement a item-based recommender. Since this kind of collaborative filtering is easier to implement, this mostly is a god method to start with, so testing on the recommendations can be performed, for example. This already is a nice addition to the content-based recommendation the application uses right now in a way (similarities) based on the course guide). The last step to implement recommendations is to identify identical students based on the courses they follow and the issues they encounter. At this moment, when the TU authentication works, students can be identified based on the study and the courses they are enrolled into. The addition of user-based recommendation is that the similarity of students do not have to be assumed by the study they follow. Therefore unexpected connections between students taking different courses and study programs can be found.

## IR architecture
The IR architecture of CECLES has been partially discussed before, but this section tries to frame it within the theoretical paradigms of the discourse. 

### Pulling or pushing information
The system of CECLES tries to provide information on demand, which is an information pull to the eye of the user. On the back hand however, the search queries have already been processed and partially ranked before the user searching for them. Depending on the point of view, the information can also be considered to be pushed to the user since the user only has to change its filters.
However, the user should get the impression that the search is rather pulled instead of pushed.

### Precision - Recall
Precision, the retrieval of the most relevant documents, and recall, the retrieval of all relevant documents, is also a part of the IR architecture. The goal of CECLES is to provide relevant documents, yet pages of the system have limited information capacity. Therefore, it is beneficial to only show the most relevant documents and aim for higher precision than recall.

### Location of Computation
CECLES is currently designed to be a centralized (one node) information retrieval platform. The queries are, to a certain degree, predefined which allows to pre-execute them (asynchronous search). Also, the searches itself are not executed by the system: CECLES uses external search APIs to retrieve the relevant study material. 
Both the predefined queries and the asynchronous search operation save computation power and allow for such a thin architecture.


[1] http://www.alchemyapi.com/products/alchemylanguage/keyword-extraction