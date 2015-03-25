## Usecase Description

The use case diagram in **fig X** gives an example of how CECLES is to behave when used by actors such as students or teachers. The diagram has a large body in the middle, the 'use cases' within this body and actors using the system outside of it.

### logging in 
In this use case, the pricipal actor is the student which is able to provide credentials to log in. Thanks to the TU Delft API (not depicted) CECLES can read which courses the student is participating.

### presenting keywords
The course database uses this information from the login to show only the courses the courses the student is interested in and the keywords that mach these interesting courses. The student can 'remove' keywords that are not relevant for him or her. This removal is considered to be a downgrade in relevance for the keyword and remembered for the next time.

### keyword validation
An alternative method of validating course keywords is by having a teacher (preferably of the course itself) look over the keywords and judge whether these are represenative of the course content.

### learning material
The learning material based on the (validated) keywords is presented to the student who can now start learning.

