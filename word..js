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
            if (regEx.text(input[i])) {

                this.letters.push(new Letter(input[i], true));
            }
            else {

                this.letters.push(new Letter(input[i]));
            }
        }
    };

    /**
     * 
     */
    this.printWord = function () {
        let display = this.printWord.reduce(function (output, currentLetter) {
            return output + currentLetter.printCharacter();
        }, "");

        return display;

    };

    this.guessLetter = function (input) {

        this.letters.forEach(function (character) {
            character.checkCharacter(input);
        });

    };
};

module.exports = Word();