## Result pipeline

### source and trigger
The result relevancy pipeline is triggered by a cronjob every time new words have been added to the database with the keywords and their relevancy score.

### search processes
The new keyword is then put into the modular search engines. ** Fig X ** illustrates the example for a Wikipedia search, yet the basic functionality of a search is comparable for every search module: the keyword is entered in the API provided by the source and the result is returned.

### relevancy rating 
The result from the search operation receives a base relevancy dependent on the search source. Some sources only return a single result, whilst others return several ranked results. * A second rating algorithm is added to the rating (See book)* 
The materials and their relevancies are added to a database for saving.

### Presentation to user and user feedback
One a user, a student, request the materials for a specific keyword, the material is sorted based on the relevancy score. If the student considered the material to be irrelevant, he or she can 'remove' the result. This action is remembered by CECLES and considered to be user feedback, reducing the relevancy of the material in the database.