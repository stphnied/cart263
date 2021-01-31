"use strict";

/*****************

Exercise 02: Slamina
Stephanie Dang

The program will speak the name of a common animal backwards and the user will have to say (with their voice) what they think it is in the form “I think it is x.”
If they get it right, their guess will be displayed in green, if they get it wrong, their guess will be displayed in red.
******************/

// Variables ----------------------------------

// Current animal name to guess
let currentChampion = "";
// Current user guess
let currentAnswer = "";
// Instruction text
let state = "menu";
let instructionTxt = "Click to start";

// setup()
// Setting up canvas
// Setting up Annyang with text defaults
function setup() {
    createCanvas(1000, 750);

    // Check if annyang is available
    if (annyang) {
        // Create commands
        let commands = {
            'I think it is *animal': guessAnimal
        };

        // Add and calls commands
        annyang.addCommands(commands);
        annyang.start();
    }

    // Text defaults
    textSize(55);
    textStyle(BOLD);
    textAlign(CENTER);
}


// draw()
// Display background
//if correct answer, displays it
//else : nothing
function draw() {
    background(255);

    switch (state) {
        case "menu":
            menu();
            break;
        case "play":
            play();
    }
}

// keyPressed function 
// Navigates to the next screen
// Allows to restart the game by pressing ENTER once the game ended
function keyPressed() {
    if (state == `menu`) {
        state = `play`;
    }
}


// When user clicks : says the animal name backward
function mousePressed() {
    if (state === "play") {
        currentChampion = random(teas);
        let reverseAnimal = reverseString(currentChampion);
        responsiveVoice.speak(reverseAnimal, "UK English Male");
        console.log(currentChampion);

        instructionTxt = "";
    }

}

// Called by annyang
// User making guess
// animal param = user's guess
function guessAnimal(animal) {
    currentAnswer = animal.toLowerCase();
    console.log(currentAnswer);
}

// Reverses the provided string
function reverseString(string) {
    // Split the string into an array of characters
    let characters = string.split('');
    // Reverse the array of characters
    let reverseCharacters = characters.reverse();
    // Join the array of characters back into a string
    let result = reverseCharacters.join('');
    // Return the result
    return result;
}

// Display the current in green if right
function displayAnswer() {
    if (currentAnswer === currentChampion) {
        fill(0, 255, 0);
    } else {
        fill(0, 0, 0);
    }

    text(currentAnswer, width / 2, height / 2);
}


// Text configuration
function displayText(string, size, x, y, color) {
    push();
    textAlign(CENTER, CENTER);
    textSize(size);
    fill(color);
    text(string, x, y);
    pop();
}