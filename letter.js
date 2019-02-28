var Letter = function (character, guessed = false) {
    this.character = character;
    this.guessed = guessed;

    this.printCharacter = function() {
        if (this.guessed) {
            return this.character;
        }
        else {
            return "_";
        }
    };

    this.checkCharacter = function(input) {
        if (input === this.character) {
            this.guessed = true;
        }
    };
};

module.exports = Letter();