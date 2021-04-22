/**
Project 2: Gachapyon
Stephanie Dang.

This script is dedicated to the minigames functionalities.

- Uses p5js
- 
*/

// Variables
let minigameCanvas;
let catsData;
let myFont;
let state = `menu`;
let gameOver = false;
let score = 0;
let scoreMoney = 0;
let timer = 30;
let userMG = {
    x: 0,
    y: 0,
    size: 150,
    img: undefined
};

let mouse = {
    x: 0,
    y: 0,
    rX: undefined,
    rY: undefined,
    size: 150,
    spacing: 250,
    img: undefined,
};

const
    NUM_CATS = 3,
    CATS_URL = `assets/data/cats.json`,
    FONT_URL = `assets/fonts/FredokaOne.ttf`,
    INSTRUCTION_TEXT = [
        `JOB DESCRIPTION:`,
        `Your friendly neighbourhood is infested with cheesy mice.
         Get rid of them and get a heifty reward!`,
        `SKILLS:`,
        `You'll need speed.
        Use your paw and click to WHACK the mice.`,
        `REWARD:`,
        `1-10: 1$ | 11-20: 2$ | 21-30: 3$ | 31-40: 5$`,
        `[CLICK TO START JOB]`
    ];


// preloads()
// Loads data, images, font
function preload() {
    catsData = loadJSON(CATS_URL);
    mouse.img = loadImage(`assets/images/mouse.png`);
    myFont = loadFont(FONT_URL);
}

// setup()
// Setting up the canva and user
function setup() {
    minigameCanvas = createCanvas(1000, 800);
    minigameCanvas.parent("#mini-games");
    textFont(myFont);
    userSetup();
    mouseSetup();
    noCursor();
}

// userSetup()
// depending on the cat selected, will load a different image
function userSetup() {
    switch (user) {
        case ``:
            userMG.img = loadImage(catsData.cats.tofu.paw_url);
            break;
        case `tofu`:
            userMG.img = loadImage(catsData.cats.tofu.paw_url);
            break;
        case `lilo`:
            userMG.img = loadImage(catsData.cats.lilo.paw_url);
            break;
        case `kosper`:
            userMG.img = loadImage(catsData.cats.kosper.paw_url);
            break;
        default:
            break;
    }
}

// mouseSetup();
// initial position
// saves possible x and y of the mouse in arrays
// calls the updateMouse() between 0.25 and 0.85 seconds
function mouseSetup() {

    mouse.x = 125;
    mouse.y = height / 1.5;

    // rX:(spacing of 250 between each)
    mouse.rX = [125, 375, 625, 875];
    // rY: only 2 heights
    mouse.rY = [height / 1.5, height / 5];

    let rTime = random(250, 760);
    setInterval(updateMouse, rTime);
}

// draw()
// Adds background color
// Handles different states
// Displays user cursor

function draw() {
    background(`aliceblue`);

    switch (state) {
        case `menu`:
            menuGame();
            break;
        case `startGame`:
            startGame();
            break;
        case `endGame`:
            endGame()
            break;
        default:
            break;
    }

    displayUser(125, height / 1.5, 150, 4, 250);
}

// displayUser()
// Displaying the user's cursor image
function displayUser() {
    imageMode(CENTER);
    image(userMG.img, mouseX, mouseY, userMG.size, userMG.size);
}

// displayHoles()
// Displaying the holes that the mouse will appear on
function displayHoles(x, y, size, nbMoles, lineSpace) {
    for (let i = 0; i < nbMoles; i++) {
        ellipseMode(CENTER);
        stroke(`#777696`);
        strokeWeight(5);
        fill(`#838996`);
        ellipse(x, y, size);
        x += lineSpace;
    }
}

// displayMouse()
// Displaying the mouse 
function displayMouse() {
    imageMode(CENTER);
    image(mouse.img, mouse.x, mouse.y, mouse.size);
}

// updateMouse()
// Updating the mouse's position randomly
function updateMouse() {
    mouse.x = random(mouse.rX);
    mouse.y = random(mouse.rY);
}

// checkMouseOverlap()
// Check if the user's cursor is over the mouse
// if yes -> add +1 to score
function checkMouseOverlap(x, y, size, lineSpace) {
    let d = dist(mouseX, mouseY, mouse.x, mouse.y);
    if (d < userMG.size / 2 + mouse.size / 2) {
        score++;
    }
    x += lineSpace;
}

// displayScore()
// Displaying the player's current score
function displayScore() {
    displayText(36, score, width / 2, height - 50);
}

// displayCountdown()
// Displays a timer going down from 30sec to 0sec
// Once it hits 0, the game over
// Framecount calculation taken from: https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-
function displayCountdown() {
    // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    if (frameCount % 60 == 0 && timer > 0) {
        timer--;
    } else if (timer == 0) {
        state = `endGame`;
    }
    displayText(24, timer, width / 2, 50);
}


// mouseClicked()
// click events
// Switch states
// Check if the user clicked on the mouse
function mouseClicked() {
    if (state == `menu`) {
        state = `startGame`
        gameOver = false;
    }
    if (!gameOver) {
        checkMouseOverlap();
    }
}

// displayText()
// template to display text
function displayText(size, string, x, y) {
    push();
    textSize(size);
    textAlign(CENTER, CENTER);
    textLeading(50);
    noStroke();
    text(string, x, y);
    pop();
}


// menuGame()
// instructions
function menuGame() {
    // Titles
    push();
    fill(`#54d6`);
    displayText(32, INSTRUCTION_TEXT[0], width / 2.1, height / 5.5);
    displayText(32, INSTRUCTION_TEXT[2], width / 2.1, height / 2.25)
    displayText(32, INSTRUCTION_TEXT[4], width / 2.1, height / 1.5)
    pop();

    // Texts
    push();
    fill(`#2d67dc`);
    displayText(28, INSTRUCTION_TEXT[1], width / 2.1, height / 3.5);
    displayText(28, INSTRUCTION_TEXT[3], width / 2.1, height / 1.85);
    displayText(28, INSTRUCTION_TEXT[5], width / 2.1, height / 1.35);
    pop();

    // PLAY
    push();
    fill(`#909eba`);
    displayText(24, INSTRUCTION_TEXT[6], width / 2.1, height / 1.1);
    pop();

}

// startGame()
// Displays all elements needed for the game
function startGame() {
    displayScore();

    displayHoles(125, height / 5, 150, 4, 250);
    displayHoles(125, height / 1.5, 150, 4, 250);

    displayMouse(125, height / 1.5, 150, 4, 250);

    displayCountdown();
}

// endGame() 
// Set the gameOver bool to true
// Displays the end screen with the amount earned
function endGame() {
    gameOver = true;

    displayText(42, `score: ` + score, width / 2, height / 2);
    displayText(42, `You earned: ` + scoreMoney + "$", width / 2, height / 1.75);

    // Calculating money earned based on performance
    if (score > 0 && score <= 10) {
        scoreMoney = 1;
    } else if (score > 10 && score <= 20) {
        scoreMoney = 2;
    } else if (score > 20 && score <= 30) {
        scoreMoney = 3;
    } else if (score > 30) {
        scoreMoney = 5;
    } else {
        scoreMoney = 0;
    }
    
    // Adds the money earned into the user's wallet
    walletAmount += scoreMoney;
}