// import Letter object constructor
var Letter = require('./letter');

/**
 * Constructor for Word. Creates an empty array of letters.
 */
var Word = function () {
    this.letters = [];

    /**
     * Function accepts a string or array of characters. Each character is added 
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
     * Gets the status of character, and print out the corresponding character based upon the state stored
     * in Letter.guessed. The entire output is condensed into a single string and returned by the function
     */
    this.printWord = function () {
        let display = this.letters.reduce(function (output, currentLetter) {
            return output + currentLetter.printCharacter();
        }, "");

        return display;

    };
    /**
     * Function to check if the inputted letter is in the stored word.
     * Function checks every Letter object and updates accordingly.
     * Returns True if the input character is in the Words.letter and has 
     * not bee guessed yet.  
     * @param {string} input
     */
    this.guessLetter = function (input) {

        // Get a string of unguessed letters in the letters array.
        let hiddenLetters = this.letters
            .filter(e => e.getGuessed() === false)
            .reduce(function (out, current) {
                return out + current.getCharacter();
            }, "");

        // Use String.includes to check if the input charact has been guessed.
        let letterGuessed = hiddenLetters.includes(input);

        // Check and update each letter object in the letters array after checking if the input was
        // in the words array.
        this.letters.forEach(function (character) {
            character.checkCharacter(input);
        });

        return letterGuessed;

    };
    /**
     * Returns true if all the letter objects have been guess, and returns false otherwise
     */
    this.wordGuessed = function () {
                // .some( letter => !letter ) is true if any letters are not guessed
                // logical not the result will return true if ALL the letter are not guessed
        return (!this.letters.some(letter => !letter.getGuessed()));
    }

    /**
     * reset the Word.array
     */
    this.reset = function() {
        this.letters = [];
    }
};

// Export
module.exports = Word;