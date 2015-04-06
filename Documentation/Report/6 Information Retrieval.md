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
The IR architecture, the process by which the system 


* search engines: built-in

[1] http://www.alchemyapi.com/products/alchemylanguage/keyword-extraction