// Battleship Game
// From Head First JavaScript

console.log('Initializing Battleship');

// Variable declarations

var location1 = 3;
var location2 = 4;
var location3 = 5;

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
