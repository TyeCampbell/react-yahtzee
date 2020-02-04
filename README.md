# React Yahtzee

### The Game

Yahtzee is a chance-and-strategy dice rolling game. A game is played over 13 rounds.

Each round, the player rolls five 6-sided dice. They may click on any number of dice to “freeze” or “unfreeze” them (frozen dice are displayed in a different color). They may re-roll the unfrozen dice up to 2 times.

Each round, they must assign their dice to any unclaimed scoring category. Each category scores differently.

After 13 rounds, the game is over, and the player’s score is the total of each scoring category.

#### Scoring Categories

Category | Description |	Example Score
---------|-------------|----------------
Ones | Score 1 for every 1 |	1 1 2 3 4 = 2
Twos |Score 2 for every 2	| 1 2 2 3 4 = 4
Threes | Score 3 for every 3 |	1 2 3 3 3 = 9
Fours | Score 4 for every 4	| 1 2 4 4 5 = 8
Fives | Score 5 for every 5 | 1 2 5 5 5 = 15
Sixes | Score 6 for every 6 | 1 2 3 6 6 = 12
3 of Kind |	If 3+ of one value, score sum of all dice (otherwise, score 0) | 1 2 3 3 3 = 12
4 of Kind |	If 4+ of one value, score sum of all dice (else 0) | 1 2 2 2 2 = 8
Full House | If 3 of one value and 2 of another, score 25 (else 0) |	2 2 3 3 3 = 25
Small Straight | If 4+ values in a row, score 30 (else 0) |	1 2 3 4 6 = 30
Large Straight | If 5 values in a row, score 40 (else 0) |	1 2 3 4 5 = 40
Yahtzee	| If all values match, score 50 (else 0) |	2 2 2 2 2 = 50
Chance | Score sum of all dice |	1 2 3 4 6 = 16

##### Example Round

The initial roll is: 2 4 3 2 5.

The player decides to try to get as many twos as possible, and clicks to freeze both twos, then re-rolls, getting a new 2 3 5. They now have: 2 2 3 2 5.

The player decides to try for a full house, and freezes all of their twos and their three (hoping to roll another 3 to get a full house). They re-roll the die showing five, getting a 6 and now have 2 2 3 2 6.

Sadly, they didn’t get their full house. They could score this as:

* Twos: for 6 points
* Threes for 3 points
* Sixes: for 6 points
* Three of Kind: (twos) for 15 points
* Chance: for 15 points
* Any other category they claimed on this round would score 0.

#### My involvement in this project 
This Yahtzee app was handed to me completely broken! I had to dig in, learn how it worked on my own, figure out what was wrong with the app and then fix it. I adjusted all the CSS to be responsive and cleaned up the overall look and feel. I added new features such as the Upper Bonus score (like the original game is played), bottom current score, dice icons, dice CSS animation, new game feature and finally saved state to local storage so that you could come back to your game in the same browser.

## My Finished Project

![Preview of working code base - Yahtzee Game App](docs/preview.gif)

[Click here](https://tyecampbell-yahtzee.netlify.com) to preview a live example. (Play speed Yahtzee with friends!)

### What I've Learned

* Local storage uses JSON.stringify but it does not allow for undefined values. Had to Use a replacer function to clean the data. 
* Local storage getItem needs to be parsed with JSON.parse. This will not allow for undefined values. 
* Used a for...in loop with the local storage parsed object to replace null values with undefined. 
* Using a call back function with SetState to invoke a function immediately after the call. 
* Sets are great as they allow comparison of items in an array. 


:thumbsup: *Thanks for checking out my work on GitHub! For more about me find me on Twitter [@TyeDev](https://twitter.com/tyedev) or visit my personal website [TyeCampbell.com](www.TyeCampbell.com).*
