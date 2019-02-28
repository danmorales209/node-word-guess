var Letter = require('./letter');

var Word = function () {
    this.letters = [];

    /**
     * Documentation
     * @param {string | Array} input
     */
    this.addWord = function (input) {
        regEx = /[\W]/g;
        for (i in input) {
            if (regEx.test(input[i])) {

                this.letters.push(new Letter(input[i], true));
            }
            else {

                this.letters.push(new Letter(input[i]));
            }
        }
    };

    /**
     * Documentation
     */
    this.printWord = function () {
        let display = this.letters.reduce(function (output, currentLetter) {
            return output + currentLetter.printCharacter();
        }, "");

        return display;

    };
    /**
     * Documentation
     * @param {string} input
     */

    this.guessLetter = function (input) {

        this.letters.forEach(function (character) {
            character.checkCharacter(input);
        });

    };

    this.wordGuessed = function () {

        return !this.letters.some( letter => !letter.guessed);
    }
};

module.exports = Word;