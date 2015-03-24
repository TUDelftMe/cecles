#Description of keyword pipeline
This document supports the keyword scheme. A majority of the functionalities in the pipeline will be present at the end of Q3 of 2015. However, for explanational purposes in this document it is assumed that all function are already present. In this pipeline only the relevance of the keywords are taken into account, the search results are set out in another document. 

##Sources
For the initial CECLES application the course data from the TUDelft API is used. To extend the course description and also for increasing the amount of keywords that are extracted, additional sources like the OCR data from the Colegerama slides should be used. This is intended to improve the relevance of the keywords that are used for querying.

Because even at the TU spelling errors are quite common, an initial spelling check on all course descriptions and goals is performed.

## Alchemy ?
Uitleg: wat Alchemy doet


## Text analysis
Since Alchemy already does a large part of the analysis, stemming is the action most performed after the term extraction. Stemming is done because after testing several queries, overlap was found between several keywords (not yet in the results). 

The keywords are then compared to a blacklist. This list consists of insignificant of simplistic words. Also, since CECLES supports users' input, the blacklist hold inappropriate words.

## Score model
The score model consists of several techniques to obtain different factors for determining the relevance of the keywords.
The keywords can be used in a Google or Wikipedia search. Keywords that have too many results are seemly too generic. Containing too less results can indicate misguided terms. 
This score model has yet to be completed with additional techniques.

A part that cannot be examined could be processed with the help of Crowdflower. If Crowdflower has to deployed already in the process of keyword operations has still to be determined.

## The User
When the keywords are extracted, scored on their relevance and sorted and filtered by eg. relevance they can be used for generating queries. Whether the right keywords are extracted is among others examined by the users' feedback. 

Relevance feedback is typically used for query expansion during short-term modeling of a user?s immediate information need and for user profiling during long-term modeling of a user?s persistent interests and preferences. Traditionally feedback methods require explicit feedback given by, for example, voting a plus or a minus. Such relevance feedback methods force users to engage in additional activities beyond their normal searching behavior. To limit this 'costs' for the user in the keyword part, CECLES focuses primarily on implicit feedback. In this way in the parts that require explicit feedback most, the effectiveness of explicit techniques will remain well.

With implicit feedback click rates, conversions and bounce rates are used to re-rank the keywords in the score model  (or in the sort and filter step). With explicit feedback the user is asked to assess the keywords on their relevance. 
Also, when a user thinks a relevant keyword is missing he or she can submit additional keywords.

###Implicit feedback
The implicit user feedback consists a.o. of the click behavior of the student. 

###Explicit feedback
Since the user interface has to be as clean as possible.




<!--
Implicit student /user
explicit teacher /expert


mate van stemming


Click op keyworda
Bepalen populariteit categorie
-->



## Key concepts

### Relevancy
Relevancy, as used in our description and diagrams, indicates whether a keyword from a course reflects the contents of the course it has been extracted from. 