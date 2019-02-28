var Word = require('./word');
var Inquire = require('inquirer');

var guessMe = new Word();

guessMe.addWord("This is a test");

console.log(guessMe.printWord());