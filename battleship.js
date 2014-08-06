// Battleship Game v2
// From Head First JavaScript

var view  = {

  displayMessage: function (msg){
    document.getElementById('messageArea').innerHTML = msg;
  },

  displayHit: function(cell) {
    document.getElementById(cell).setAttribute('class', 'hit');
  },

  displayMiss: function(cell) {
    document.getElementById(cell).setAttribute('class', 'miss');
  }

};

var model = {

  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk: 0,

  ships: [{ locations: [0, 0, 0], hits: ["", "", ""] },
          { locations: [0, 0, 0], hits: ["", "", ""] },
          { locations: [0, 0, 0], hits: ["", "", ""] }],

  fire: function(guess) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      var index = ship.locations.indexOf(guess);
      if(index !== -1) {
        ship.hits[index] = 'hit';
        view.displayHit(guess);
        view.displayMessage('HIT!');
        if (this.isSunk(ship)) {
          view.displayMessage('You sank my battleship!');
          this.shipsSunk++;
        }
        return true;
      }
    }
    view.displayMiss(guess);
    view.displayMessage('You missed!');
    return false;
  },

  isSunk: function(ship) {
    for (var i = 0; i < this.shipLength; i++) {
      if (ship.hits[i] !== 'hit') {
        return false;
      }
    }
    return true;
  },

  generateShipLocations: function() {
    var locations;

    for (var i = 0; i < this.numShips; i++) {
      do {
        locations = this.generateShip();
      } while (this.collision(locations));
      this.ships[i].locations = locations;
    }
  },

  generateShip: function() {
    var direction = Math.floor(Math.random() * 2);
    var row, col;

    if (direction === 1) {
      row = Math.floor(Math.random() * this.boardSize);
      col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
    } else {
      col = Math.floor(Math.random() * this.boardSize);
      row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
    }

    var newShipLocations = [];
    for (var i = 0; i < this.shipLength; i++) {
      if (direction === 1) {
        newShipLocations.push(row + '' + (col + i));
      } else {
        newShipLocations.push((row + i) + '' + col);
      }
    }

    return newShipLocations;
  },

  collision: function(locations) {
    for (var i = 0; i < this.numShips; i++) {
      var ship = model.ships[i];
      for (var j = 0; j < locations.length; j++) {
        if (ship.locations.indexOf(locations[j]) >= 0) {
          return true;
        }
      }
    }
    return false;
  }

};

function parseGuess(guess) {

  var parsedGuess = null;
  var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  var row, column;

  if(guess.length === 2) {
    row = alphabet.indexOf(guess[0]);
    column = guess[1];
    if(!isNaN(row) &&
       !isNaN(column) &&
       row >= 0 &&
       column >= 0 &&
       row < model.boardSize &&
       column < model.boardSize) {
         parsedGuess = row + column;
       }
  }

  return parsedGuess;
}

var controller = {

  guesses: 0,

  processGuess: function(guess) {
    var location = parseGuess(guess);
    if(location) {
      this.guesses++;
      var hit = model.fire(location);
      if(hit && model.shipsSunk === model.numShips) {
        view.displayMessage('You sank all my battleships, in ' +
                                      this.guesses + ' guesses');
      }
    }
  }
};

function init() {
  var fireButton = document.getElementById('fireButton');
  fireButton.onclick = handleFireButton;

  var guessInput = document.getElementById('guessInput');
  guessInput.onkeypress = handleKeyPress;

  model.generateShipLocations();
}

function handleFireButton() {
  var guessInput = document.getElementById('guessInput');
  var guess = guessInput.value;

  controller.processGuess(guess);
  guessInput.value = '';
}

function handleKeyPress(e) {
  var fireButton = document.getElementById('fireButton');
  if (e.keyCode === 13) {
    fireButton.click();
    return false;
  }
}

window.onload = init;
