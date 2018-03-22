# Multiplex Manager

## Introduction
The Multiplex Manager is an application built for theatre scheduling. Assuming the multiplex contains multiple screens, each playing a different movie throughout the day, the manager app will create a schedule of start and end times for each movie. The generated schedule takes into account previews as well as cleaning times in between showings.

## User Guide
Movie Rules
Here is a list of the rules for each viewing of a movie.
- Each movie should start at easy to read times (eg 10:00, 10:05, 10:10).
- The start time of the movie is exactly at the posted start time.
- Each movie requires 15 minutes for previews before the start of the movie.
- Each movie requires 20 minutes after its end time to prepare the theatre for the next
movie 5.
 eatre Rules
Here is a list of rules that are global to the cinema:
- The cinema requires 15 minutes after opening before the  rst movie is shown.
- No movie should end after the cinema’s hours of operation.
- The last showing should end as close as possible to the end of the cinema’s hours of
operation.
Hours of Operation
The theatre has the following hours of operation.
- Monday - Thursday 11am - 11pm. - Friday - Sunday 10:30 am - 12 am.

REQUIREMENTS
Your system should be able to take in the details of each movie and output a start and end time of each showing that abides by all of the provided rules. The runtime of each movie does not include time for previews or cleanup.
The method of input can be interactive (GUI/Web/CLI) or via a structured input  le format. The output of the system can also be via display or writing output  les.

## EXAMPLE

Below is a screenshot from the Multiplex Manager showing movie times from Mean Girls.

