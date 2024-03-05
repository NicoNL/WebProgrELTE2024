# Task 1: Array-functions
Inside the `script.js` you will find an array that contains objects. Answer these questions into the given HTML element in the brackets! (These are also given in the script file)

-[ ] a. What kind of 'element' is what Zuko bends? `1 points`
-[ ] b. Are all characters adults (older than 18 years)? Display, 'Yes.' or 'No.' into the given field. `1 points`
-[ ] c. List the names of waterbenders! `1 points`

# Task 2: Connections (6 points)
This game is about making 4 groups of words out of 16, groups can be formed with any kind of connections. Here we have fruits in the example task with: 'Watermelon, Lemon, Cherry, Grapes'
Most of the game is already written but you still have two little features to add. First, you have to select 4 elements from the table, then you have to press the `Check` button, and it should add a new card into your game.

-[ ] A1) Add an event to the table's cell! By clicking on the table's cell, we should check if we clicked on a 'td' or not. If it's a `td`, set its `backgroundColor` to `lightgreen`. `1 points`
-[ ] A2) After that you should `push()` the `innerText` of the `e.target` to the array named `selected`. (`selected` is already initialized for you) `1 points`
-[ ] A3) Before the addition and coloring, we should check if the `selected` array's length is 4, and if it is then we should make the selected empty again and make all the td-s backgroundColor to unset. `2 points`
-[ ] B1) After that, you have to display the selected elements into the card. Create a `ul`, append the `li`-s inside of it with the right content, and then append the `ul` to the element with the id `#answers`. `2 points`