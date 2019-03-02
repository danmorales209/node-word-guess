var Word = require('./word');
var Inquire = require('inquirer');
var ChalkPipe = require('chalk-pipe');



var guessMe = new Word();
var guessesRemaining = 10;
var guessedLetters = [];

guessMe.addWord("2001: A Space Odyssey".toUpperCase());


function playGame() {

    console.log(`Your word: ${guessMe.printWord()}  Guesses Remaining: ${guessesRemaining}`);

    console.log(guessedLetters.reduce((output, letter) => (output + letter + ' '), ""));

    if (!guessMe.wordGuessed() && (guessesRemaining > 0)) {
        Inquire
            .prompt([
                {
                    type: "input",
                    name: "guess",
                    message: "Please guess a letter"
                }
            ]).then(function (answer) {
                console.clear();

                if (answer.guess.length > 1) {
                    console.log(ChalkPipe('red.bold')("Please enter a single character.".toUpperCase()));
                }
                else if (guessedLetters.some(letter => letter === answer.guess.toUpperCase())) {
                    console.log(ChalkPipe('red.bold')(`${answer.guess} has been guessed already, please select a new character.`));
                }
                else {
                    let letterInWord = guessMe.guessLetter(answer.guess.toUpperCase());
                    console.log(letterInWord);

                    if (letterInWord) {
                        console.log(ChalkPipe("green.bold")("Correct!"))
                    }
                    else {
                        console.log(ChalkPipe("red.bold")("Incorrect!"))
                        guessesRemaining--;
                    }


                    guessedLetters.push(answer.guess.toUpperCase());
                }

                console.log(`Your word: ${guessMe.printWord()}  Guesses Remaining: ${guessesRemaining}`);

                console.log(guessedLetters.reduce((output, letter) => (output + letter + ' '), ""));

                playGame();

            });
    }
    else {
        console.log("Game Over");
    }

}

playGame();