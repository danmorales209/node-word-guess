var Word = require('./word');
var Inquire = require('inquirer');



var guessMe = new Word();
var wordGuessed = false;
var guessesRemaining = 10;
var guessedLetters = [];
guessMe.addWord("This is a test".toLocaleUpperCase());

console.log(guessMe.printWord());

function playGame() {

    console.log(guessMe.wordGuessed());

    if (!guessMe.wordGuessed() && (guessesRemaining > 0)) {
        Inquire
            .prompt([
                {
                    name: "guess",
                    message: "Please guess a letter"
                }
            ]).then(function (answer) {
                console.clear();

                if (answer.guess.length > 1) {
                    console.log("Please enter a single character.");
                }
                else if (guessedLetters.some(letter => letter === answer.guess)) {
                    console.log(`${answer.guess} has been guessed already, please select a new character.`)
                }
                else {
                    guessMe.guessLetter(answer.guess.toUpperCase());
                    guessesRemaining--;
                    guessedLetters.push(answer.guess.toUpperCase());
                }

                console.log(`Your word: ${guessMe.printWord()}  Guesses Remaining: ${guessesRemaining}`);
                console.log(guessedLetters.reduce((output, letter) => (output + letter + ' '),""));
                playGame();

            });
    }
    else {
        console.log("Game Over");
    }

}

playGame();