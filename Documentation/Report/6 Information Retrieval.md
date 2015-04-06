# Information Retrieval
This chapter takes a more theoretical view on the IR processes that are included in CECLES.

## AlchemyAPI
CECLES uses the AlchemyAPI early on for the extraction of terms from the course guide. Although easily implemented and bringing back useful results, the Alchemy is a proprietary system and does not disclose exactly which algorithms are used. 
However, from the description it is possible to assume that Alchemy performs semantic analysis of text and tokenization. It also has a 'relevancy score' from 0 to 1 for each keyword extracted which is based on the text analyzed. Yet this the algorithm computing this score is, like before, a black box [AlchemyAPI][1].

## Stemming
Stemming, the process by which words are reduced to their stem, is currently not implemented in CECLES. 
The system could benefit from such an implementation since some keywords in CECLES are a more specific instance of another keyword (e.g. "self-adjoint operators" and "unbound self-adjoint operators"). 
These keywords are partially overlapping in their representation of the course contents.
However, implementing such stemming might reduce specificity of a keyword and therefore reduce the relevancy of later retrieved study material. 
This is a dilemma which needs to be resolved though trial-and-error with user feedback.

## Recomender system

## IR architecture
The IR architecture, the process by which the system 


* search engines: built-in

[1] http://www.alchemyapi.com/products/alchemylanguage/keyword-extraction