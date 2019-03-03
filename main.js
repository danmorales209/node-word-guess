var Word = require('./word');
var list = require('./movies');
var Inquire = require('inquirer');
var ChalkPipe = require('chalk-pipe');



var guessMe = new Word();
var guessesRemaining = 10;
var guessedLetters = [];
var index = Math.floor(Math.random() * list.movies.length);

guessMe.addWord(list.movies[index].toUpperCase());


function playGame() {

    console.log(ChalkPipe('cyan.bold')(`\nYour word:\n${guessMe.printWord()}`));
    console.log(ChalkPipe('yellow')(`\nGuesses Remaining: ${guessesRemaining}`));

    console.log(ChalkPipe('yellow.bold')('Guessed Letters:\n') + ChalkPipe('bgBlackBright.green.bold')(" " + guessedLetters.reduce((output, letter) => (output + letter + ' '), "")));

    if (!guessMe.wordGuessed() && (guessesRemaining > 0)) {
        Inquire
            .prompt([
                {
                    type: "input",
                    name: "guess",
                    message: "Please guess a letter or number: "
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

                    if (letterInWord) {
                        console.log(ChalkPipe("green.bold")("Correct!"))
                    }
                    else {
                        console.log(ChalkPipe("red.bold")("Incorrect!"))
                        guessesRemaining--;
                    }


                    guessedLetters.push(answer.guess.toUpperCase());
                }

                playGame();

            });
    }
    else {
        if (guessMe.wordGuessed()) {
            console.log(ChalkPipe('green.bold.bgBlackBright')("\n---GAME OVER---\n    You won!   "))
        }
        else {
            console.log(ChalkPipe('red.bold.bgBlackBright')("\n---GAME OVER---\n   You lost... "))
        }
        Inquire
            .prompt([
                {
                    type: "confirm",
                    name: "newGame",
                    message: "Would you like to play again?\n"
                }
            ]).then(function (response) {

                if (response.newGame) {
                    index = Math.floor(Math.random() * list.movies.length);
                    guessMe.reset();
                    guessMe.addWord(list.movies[index].toUpperCase());
                    guessedLetters = [];
                    guessesRemaining = 10;

                    console.clear();
                    playGame();
                }
                else {
                    console.log(ChalkPipe('orange.bold')("Thanks for playing, see ya!"));
                }
            })
    }
}

playGame();