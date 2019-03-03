// Dependencies
var Word = require('./word');
var list = require('./movies');
var Inquire = require('inquirer');
var ChalkPipe = require('chalk-pipe');


// **Gobal variables**
// Word object declaration
var guessMe = new Word();
// Initialize the number of guesses
var guessesRemaining = 10;
// Array to store guessed letters
var guessedLetters = [];
// Random number to pick an index from the imported array of movies titles
var index = Math.floor(Math.random() * list.movies.length);
// Call Word.addword() to set the word array. Use upper case to help with input validation
guessMe.addWord(list.movies[index].toUpperCase());

// Recursive function acts like game loop. Allows for looping with inquirer asynchronous interactions with user 
function playGame() {

    // Initial game status
    console.log(ChalkPipe('cyan.bold')(`\nYour word:\n${guessMe.printWord()}`));
    console.log(ChalkPipe('yellow')(`\nGuesses Remaining: ${guessesRemaining}`));

    console.log(ChalkPipe('yellow.bold')('Guessed Letters:\n') + ChalkPipe('bgBlackBright.green.bold')(" " + guessedLetters.reduce((output, letter) => (output + letter + ' '), "")));

    // Check for end of game conditions (word guessed or out of guesses)
    if (!guessMe.wordGuessed() && (guessesRemaining > 0)) { // End of game not reached
        // Get user guess
        Inquire
            .prompt([
                {
                    type: "input",
                    name: "guess",
                    message: "Please guess a letter or number: "
                }
            
            // Do something with the guess
            ]).then(function (answer) {
                console.clear();

                // Ensure only one character is passed
                if (answer.guess.length > 1) {
                    console.log(ChalkPipe('red.bold')("Please enter a single character.".toUpperCase()));
                }
                // Check for repeated letters against 
                else if (guessedLetters.some(letter => letter === answer.guess.toUpperCase())) {
                    console.log(ChalkPipe('red.bold')(`${answer.guess} has been guessed already, please select a new character.`));
                }
                // Valid guess
                else {
                    // function checks each letter object in the Word.letters array, and return Boolean informing success
                    let letterInWord = guessMe.guessLetter(answer.guess.toUpperCase());

                    // Letter was in word
                    if (letterInWord) { 
                        console.log(ChalkPipe("green.bold")("Correct!"))
                    }
                    // Letter was not in word
                    else {
                        console.log(ChalkPipe("red.bold")("Incorrect!"))
                        // Reduce the guesses remaining (exit condition)
                        guessesRemaining--;
                    }

                    // Update the guessed letter array. Force input to upper case to ease input validation
                    guessedLetters.push(answer.guess.toUpperCase());
                }

                // Recursive call to playGame() function to continue game loop
                playGame();

            }); // End valid guess logic
    }
    // End conditions reached
    else {
        if (guessMe.wordGuessed()) { // Word was guessed
            console.log(ChalkPipe('green.bold.bgBlackBright')("\n---GAME OVER---\n    You won!   "))
        }
        else { // Uers ran out of guesses
            console.log(ChalkPipe('red.bold.bgBlackBright')("\n---GAME OVER---\n   You lost... "))
        }
        
        // Get user input to play again
        Inquire
            .prompt([
                {
                    type: "confirm", // Yes / no, returns boolean
                    name: "newGame",
                    message: "Would you like to play again?\n"
                }

            // Do something with user input
            ]).then(function (response) {

                if (response.newGame) { // play again
                    // Resset the game state
                    index = Math.floor(Math.random() * list.movies.length);
                    guessMe.reset();
                    guessMe.addWord(list.movies[index].toUpperCase());
                    guessedLetters = [];
                    guessesRemaining = 10;

                    console.clear();
                    // Recursive call to playGame() to restart game loop 
                    playGame();
                }
                else { // end the game
                    console.log(ChalkPipe('orange.bold')("Thanks for playing, see ya!"));
                }
            });
    } // End of end condition check logic
};

// Initial call to play
playGame();