var Letter = require('./letter');

var Word = function () {
    this.letters = [];

    /**
     * Documentation
     * @param {string | Array} input
     */
    this.addWord = function (input) {
        pattern = new RegExp('[^A-Za-z0-9]');

        let isGuessed;
        for (i in input) {

            isGuessed = pattern.test(input[i]);
            
            this.letters.push(new Letter(input[i], isGuessed));
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

        let hiddenLetters = this.letters
            .filter(e => e.getGuessed() === false)
            .reduce(function (out, current) {
                return out + current.getCharacter();
            }, "");


        let letterGuessed = hiddenLetters.includes(input);

        this.letters.forEach(function (character) {
            character.checkCharacter(input);
        });

        return letterGuessed;

    };

    this.wordGuessed = function () {

        return (!this.letters.some(letter => !letter.getGuessed()));
    }

    this.reset = function() {
        this.letters = [];
    }
};

module.exports = Word;