var Letter = function (character, guessed = false) {
    this.character = character;
    this.guessed = guessed;

    this.printCharacter = function () {
        return (this.guessed ? this.character : "_");
    };

    /**
     * Documentation
     * @param {string} input 
     */
    this.checkCharacter = function (input) {
        if (input === this.character) {
            this.guessed = true;
        }
    };
};

module.exports = Letter();