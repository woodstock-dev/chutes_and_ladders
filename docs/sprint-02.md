# Overview

In the game Chutes and Ladders, each space has a set of properties, and those properties are governed by a set of rules.

1) The bottom row MUST NOT have any chutes.
2) The top row MUST NOT have any ladders.
3) Neither a chute, or a ladder may connect on the same row.
4) No chute or ladder will increase or decrease the players standing more than fourty spaces.
5) There will only be five chutes and five ladders on the first board.
6) There will be exactly 100 spaces on the board, grouped in rows of 10 starting from the lower left corner and 1 and
   alternating directions until 100 is reached.
7) A player piece MUST only occupy one space at a time.
8) A Space MUST only host one player at a time, if a play lands on an occupied space, the player landing on the space
   will occupy that space and advance the other original player by one space. All rules apply to both players.
9) If a player lands on a space that has a chute, the player will automatically move to the space indicated by the chute
   which will be less than the current values mod(10)*10 and greater a random number space-40 or 1 which ever is
   greater.
10) If a player lands on a space that has a ladder, the player will automatically advance to the space indicated by the
    ladder, which will be greater than the current mod(10)+1 and less than or equal to arandom number in the range space
    value + 40 and less than 100
11) No row should have more than one chute and no more than one ladder.

## Definitions covered in class

* [Tuple](https://en.wikipedia.org/wiki/Tuple) - A list of one or more numbers between parentheses (1, 2, 3), (
  7,10,1,5). There are no bounds placed on a tuple other than what is needed for the equation.
* [Node](https://en.wikipedia.org/wiki/Node_(computer_science)) - A node connects zero to many nodes to form complex
  data structures.

## Sprint 2 Scope

This sprint we will focus on bulding the board, the spaces and the integrity of each space.

## Game Board

Given the following gameboard, create a data structure to represent the board.

|     |    |    |    |    |    |    |    |    |    |
|-----|----|----|----|----|----|----|----|----|----|
| 100 | 99 | 98 | 97 | 96 | 95 | 94 | 93 | 92 | 91 |
| 81  | 82 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 90 |
| 80  | 79 | 78 | 77 | 76 | 75 | 74 | 73 | 72 | 71 |
| 61  | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 |
| 60  | 59 | 58 | 57 | 56 | 55 | 54 | 53 | 52 | 51 |
| 41  | 42 | 43 | 44 | 44 | 46 | 47 | 48 | 49 | 50 |
| 40  | 39 | 38 | 37 | 36 | 35 | 34 | 33 | 32 | 31 |
| 21  | 22 | 23 | 34 | 25 | 26 | 27 | 28 | 29 | 30 |
| 20  | 19 | 18 | 17 | 16 | 15 | 14 | 13 | 12 | 11 |
| 1   | 2  | 3  | 4  | 5  | 6  | 7  | 8  | 9  | 10 |

It may look something like this:

```typescript
let total = 100;
for (let i: number = 10; i >= 1; i--) {
    let row = []
    for (let j: number = 1; j <= 10; j++) {
        row.push(total--);
    }
    row = (i % 2 == 0) ? row : row.reverse()
    console.log(row);
}
```

At initial glace, this appears to be correct until we start adding rules to the individual spaces.
For example, a space MAY have a chute or a ladder so long as it adheres to rules above. In addition, we see that each
row has explicit (and implicit) rules. The last row in the example above MUST not have any chutes.

Therefore, as software developers we need to look at the problem past the simple solution and consider how all of
these units work together to form the game.

## Stories

> Reminder, all stories are expected to have test cases to prove the work is complete.

1) As a developer I will write the classes that implement the ISpace,
   SpaceType [interfaces](../src/ts/model/interfaces.ts) so that I may run the following tests:
    1) Verify all Space Types.
    2) Verify that I can assign any string value to a space.
    3) Verify that I can create spaces sequentially.

2) As a developer I will create a list of places that link from 1 to 20, manually creating the spaces and interlinks so
   that I may test the land function on each space. Since land takes an IAvatar, I will implement a simple avatar in my
   test case and replace it in the next sprint.

3) As a developer I will create a set of methods to enforce and verify the rules.




