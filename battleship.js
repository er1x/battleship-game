// Battleship Game
// From Head First JavaScript

console.log('Initializing Battleship');

// Variable declarations

var randomLoc = Math.floor(Math.random() * 5);

var location1 = randomLoc;
var location2 = location1 + 1;
var location3 = location2 + 1;

var guess;
var hits = 0;
var guesses = 0;

var isSunk = false;

// Game Loop

while(!isSunk) {
  guess = prompt('Guess!');

  if(guess < 0 || guess > 6) {
    alert('Use a valid number!');
  } else {
    guesses += 1;
    if(guess == location1 || guess == location2 || guess == location3) {
      alert('Hit!');
      hits += 1;
      if(hits == 3){
        isSunk = true;
        alert('You sank my battleship!');
      }
    } else {
      alert('Miss');
    }
  }
}

alert('Game finished. Total guesses = ' + guesses);
