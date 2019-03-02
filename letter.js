var Letter = function (character, guessed = false) {
    this.character = character;
    this.guessed = guessed;

    this.printCharacter = function () {
        //return (this.guessed ? (this.character + ' ') : "_ ");
        let out = '';

        if (this.getGuessed() === true) {
            out = this.getCharacter() + " ";
        }
        else {
            out = "_ ";
        }

        //console.log(this.getGuessed(), out)

        return out;
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

    this.getGuessed = function () {
        return this.guessed;
    };

    this.getCharacter = function () {
        return this.character;
    };
};

module.exports = Letter;