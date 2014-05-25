**Gameplay mechanics:**
_Turn-based_
- Decide on grid size.
- Players play a part in determining the opponent's board before the match begins.
- Speak to wit.ai to enter valid words, which will determine the letters that populate the opponent's board. It's easier to brainstorm words orally rather than by typing. A percentage bar will gradually fill as the letter count in each word adds up to fill the grid.
- All letters, even the ones that are duplicates between words, will be included on the opponent's board. It is up to the opponent to determine how to arrange these words, and it is possible that letters originally included as duplicates will be extra because of intersecting words.
_Moving the tiles_
- Initially, click on arrow keys outside each of the 4 sides of the grid to shift entire rows and columns
- Eventually, speak to wit.ai {row, #, direction) to move. (however, slow because of processing)

**Design aspects**
- Because Pearson's dictionary returns more than one definition (and variation) for a given word in the grid, we must parse the JSON results that Pearson returns to de-dupe. To do this, we perform HTTP GET requests for each of the combinations in the grid that are new to the most recent move. Instead of relying on the individual results themselves, we optimize by performing a recursive binary tree algorithm whose branching relies on the "total" attribute of each JSON response. This brings the number of HTTP GET requests from O(n) to O(logn).