"use strict";

/*****************

Exercise 02: Slamina : Fruit basket
Stephanie Dang

The program will speak the name of a common fruit by spelling each letters in a distorted voice
and the user will have to say (with their voice) what they think it is in the form “Answer x.”

If they get it right, their guess will be displayed in green, if they get it wrong, their guess will be displayed in red.

New features:
- FRUITS
- MUSIC
- CUTE RESPONSIVE VOICE 
- START SCREEN
- SCORE

hint : If you open the console, you can guess all the fruits like a wizard!
******************/

// Variables ----------------------------------

// Constant for instruction text
const INSTRUCTION_TEXT = `Guess the fruit by saying "Answer [fruit]"`;
//Constant for loading sound
const BACKGROUND_MUSIC = `assets/sounds/piece-of-cake.mp3`;
// Constant for loading images
const
    GOOD_JOB_IMG = `assets/images/happi-oranji.png`,
    BAD_JOB_IMG = `assets/images/angy-tomato.png`;

// Constants for colors
const
    ORANGE_COLOR = `#ffb733`,
    BROWN_COLOR = `#322001`,
    RED_COLOR = `#ff3333`,
    GREEN_COLOR = `#026440`;

// States
let state = `menu`;
// Current fruit name to guess
let currentFruit = ``;
// Current user guess
let currentAnswer = ``;
// Circle button
let circle = {
    x: 0,
    y: 0,
    size: 50
};
// Storing the points earned from user
let score = 0;
// Music
let bgSFX;
// Images
let orangeImg;
let tomatoImg;
let answerImg;

// preload()
// Loads the music
// loads the images
function preload() {
    bgSFX = loadSound(`${BACKGROUND_MUSIC}`);
    orangeImg = loadImage(`${GOOD_JOB_IMG}`);
    tomatoImg = loadImage(`${BAD_JOB_IMG}`);
}

// setup()
// Setting up canvas
// Setting up Annyang with text defaults
function setup() {
    createCanvas(1000, 750);

    // Check if annyang is available
    if (annyang) {
        // Create commands
        let commands = {
            'Answer *fruit': guessFruit
        };

        // Add and calls commands
        annyang.addCommands(commands);
        annyang.start();
    }

    // Text defaults
    textSize(36);
    textStyle(BOLD);
    textAlign(CENTER);
    noStroke();

    // Circle setup
    circle.x = width / 2;
    circle.y = height / 1.1;
}

// draw()
// Display background
//if correct answer, displays it
//else : nothing
function draw() {
    background(250);

    switch (state) {
        case "menu":
            menu();
            break;
        case "play":
            play();
            break;
    }
}

// keyPressed function 
// Navigates to the next screen
// Allows to restart the game by pressing ENTER once the game ended
function keyPressed() {
    if (state == `menu`) {
        if (keyCode === ENTER) {
            state = `play`;
        }
    }
}

// mousePressed()
// When user clicks on the NEXT btn the program spells the fruit's letter one by one
// Empties the current answer if there is one
function mousePressed() {
    if (state === "play") {
        let d = dist(mouseX, mouseY, circle.x, circle.y);
        if (d < circle.size / 2) {
            currentFruit = random(fruits);
            let splitFruit = splitString(currentFruit);
            responsiveVoice.speak(splitFruit, "Japanese Female", {
                rate: 1.3
            });
            console.log(currentFruit);

            currentAnswer = "";
            loop();
        }
    }
}

// Called by annyang
// User making guess
// fruit param = user's guess
function guessFruit(fruit) {
    currentAnswer = fruit.toLowerCase();
    console.log(currentAnswer);
}

// Reverses the provided string
function splitString(string) {
    // Split the string into an array of characters
    let characters = string.split('');
    let result = characters.join();
    // Return the result
    return result;
}

// Display happi oranji if right
// Display angy tomato if wrong
// Display nothing when it's a new guess
function displayAnswer() {
    if (currentAnswer === currentFruit && currentFruit != "") {
        fill(ORANGE_COLOR);
        answerImg = new AnswerImages(orangeImg);
        answerImg.display();
        addScore();
    } else if (currentAnswer != currentFruit && currentAnswer != "") {
        answerImg = new AnswerImages(tomatoImg);
        answerImg.display();
        fill(RED_COLOR);
    } else {
        answerImg = new AnswerImages(tomatoImg);
        answerImg.hide();
    }

    // displays the current answer
    text(currentAnswer, width / 2, height / 2);

    push();
    fill(GREEN_COLOR);
    text("score:" + score, width / 2, height / 3);
    pop();
}

// Display the buton for the next guess
function displayNextBtn() {
    fill(`#026440`);
    displayText(`NEW FRUIT`, 14, width / 2, height / 1.16, 0);
    ellipse(circle.x, circle.y, circle.size);
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

// Play music in loop
function playMusic() {
    if (!bgSFX.isPlaying()) {
        bgSFX.setVolume(0.05);
        bgSFX.loop();
    }
}

// Add one points for each good answer
function addScore() {
    score++;
    noLoop();
}