/**
 * Letter Constructor.
 * Accepts an character as an input, stores the values to this.character,
 * saves the bool guessed to this.guess. 
 * If guessed is not supplied, default behavior is false.
 * @param {String} character 
 * @param {Boolean} guessed 
 */
var Letter = function (character, guessed = false) {
    this.character = character;
    this.guessed = guessed;

    /**
     * Function checks and formats the letter output.
     * If the letter has been guess, output the character with a trailing space
     * Otherwise print an underscore with a trailing space
     */
    this.printCharacter = function () {

        let out = '';

        if (this.getGuessed() === true) {
            out = this.getCharacter() + " ";
        }
        else {
            out = "_ ";
        }

        return out;
    };

    /**
     * Checks the input against the value stored in the Letter.guessed.
     * If input equals letter guessed, Letter.guessed is changed to true.
     * @param {string} input 
     */
    this.checkCharacter = function (input) {
        if (input === this.character) {
            this.guessed = true;
        }
    };
    /**
     * Getter for Letter.guessed
     */
    this.getGuessed = function () {
        return this.guessed;
    };

    /**
     * Getter for Letter.character
     */
    this.getCharacter = function () {
        return this.character;
    };
};
// Export for use elsewhere
module.exports = Letter;