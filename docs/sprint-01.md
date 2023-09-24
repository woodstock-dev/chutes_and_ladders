# Sprint 1

**Time:** 1 week

**Feature**

Player movement - create a system that allows a player to move around the playing board.

Explore the different methods of movement using dice, there may be more than one die, or a single with any number of
sides. At the end of sprint, be prepared to discuss your decision.

### Tools 

In this exercise, it may help to have two physical six (or other) sided dice. Stories 1-4 below are explored
using a single six sided dice. E.g. How can I as a programmer duplicate the functionality of this dice.

Stories 5-7 explore adding the second dice to the mix.

> See [Terms & Definitions](./terms.md) for more details.


> Use the templates found in the src/js directory to complete the stories

## Stories

> Note, normally testing is an expectation, not a single story as the test cases MAY be used to demonstrate the work at
> the end of the sprint.

1. As a developer I will write a method that produces a random number between 1 and 6 so that I may simulate a six sided
   dice.

2. As a developer I will write a test case that proves my random function works as expected by calling it in a for loop
   at least 100 times and verify that the number is between one and six.

3. As a developer I will write a class that represents a single Dice (Die) with a given number of sides so that I can
   test die with various number of sides.

4. As a developer I will test my Die class to ensure that all methods work as expected.

5. As a developer I will write a test case that rolls a dice multiple times and sums the values, I will ensure that the sum of
   the dice is >= the sum of the lowest possible values and <= the product of the total rolls and the highest value

6. As a developer I will write a test using mixed die, one six sided die, and one four sided die and verify the rolls
   based on the criteria of story 5.

7. As a developer I will write an opinion on which combination of die I believe would be best for a board of 100 spaces
   and why I believe that choice is the right one.
