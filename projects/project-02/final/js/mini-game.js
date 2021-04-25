/**
Project 2: Gachapyon
Stephanie Dang.

This script is dedicated to the minigames functionalities.
This script includes p5js and ome jquery codes.

We can find 2 minigames functions in here.

MINIGAME 1: WHACK A MOUSE
    - User has to click on the mouse to gain a point
    - The mouse's position will change every miliseconds (random)
    - The user only has 30 seconds to whack the most they can


MINIGAME 2: GO FISH
    - User has to hover around the fish to catch them
    - The user only has 5 seconds to catch them all


At the end of of both minigames/jobs, the user will earn a reward (coins) depending on their performance.
Minigame 1 has a bigger reward sine it is harder. (varies from 0 to 5$).
Minigame 2 has a reward of 0-2$.

*/

// Variables
//  ---------------------------------------------------------------------
// general variables
let minigameCanvas;
let catsData;
let myFont;
let state = `menu`;

// bool
let minigameNb = 1;
let minigame1 = false;
let minigame2 = true;
let gameOver = false;

// money/score related
let score = 0;
let scoreMoney = 0;
let timer = 0;
let mousePosInterval;
let dataM;

// user
let userMG = {
    x: 0,
    y: 0,
    size: 150,
    img: undefined
};

// mouse
let mouse = {
    x: 0,
    y: 0,
    rX: undefined,
    rY: undefined,
    size: 150,
    spacing: 250,
    img: undefined,
};
let mice = [];
let mouseImg;

// fish
let fishies = [];
let fishImg;

// constant
// Unchanging num and text
// URL
const
    NUM_CATS = 3,
    NUM_FISHIES = 100;
CATS_URL = `assets/data/cats.json`,
    FONT_URL = `assets/fonts/FredokaOne.ttf`,
    MOUSE_URL = `assets/images/mouse.png`,
    FISH_URL = `assets/images/fish.png`,
    TITLE_TEXT = [
        `WHACK-A-MOUSE`,
        `GO FISH`
    ],
    INSTRUCTION_TEXT = [
        `JOB DESCRIPTION:`,
        `SKILLS:`,
        `REWARD:`,

        `Your friendly neighbourhood is infested with cheesy mice.
         Get rid of them and get a heifty reward!`,
        `You'll need speed.
        Use your paw and click to WHACK the mice.`,
        `1-10: 1$ | 11-20: 2$ | 21-30: 3$ | 31-40: 5$`,

        `Your local fish shop is in need of fisherman.
        Catch some fish for a buck or two!`,
        `You'll need precision.
        Use your paw and hover to catch the fishies.`,
        `1-90: 1$ | 91-100: 2$`,
        `[CLICK TO ACCEPT JOB]`,
        `[CLICK TO ACCEPT REWARD]`
    ];


// FUNCTIONS
//  ---------------------------------------------------------------------
// preloads()
// Loads data, images, font
function preload() {
    myFont = loadFont(FONT_URL);
    catsData = loadJSON(CATS_URL);

    mouse.img = loadImage(MOUSE_URL);
    fishImg = loadImage(FISH_URL);
}

// setup()
// Setting up the canva, user and timer
function setup() {
    minigameCanvas = createCanvas(1000, 800);
    minigameCanvas.parent("#mini-games");
    textFont(myFont);

    userSetup();
    noCursor();
    mouseSetup();
    fishSetup();
    timerSetup();

    dataM = JSON.parse(localStorage.getItem(`dataMoney`));
}

function timerSetup() {
    // MINIGAME 1
    if (minigame1) {
        timer = 10;
    }
    // MINIGAME 2
    else if (minigame2) {
        timer = 5;
    }

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

// MINIGAME 1
//  --------------------------------------------------------------------------------------------------------------------

// mouseSetup();
// MINIGAME 1
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

    // let minSpeed = 250;
    // let maxSpeed = 760
    let rTime = random(250, 760);
    mousePosInterval = setInterval(updateMouse, rTime);
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


// MINIGAME 2
//  --------------------------------------------------------------------------------------------------------------------

function fishSetup() {
    for (let i = 0; i < NUM_FISHIES; i++) {
        let x = random(0, width);
        let y = random(0, height);

        let fish = new Fish(x, y, fishImg);
        fishies.push(fish);

    }
}

//  --------------------------------------------------------------------------------------------------------------------

// displayScore()
// Displaying the player's current score
function displayScore() {
    displayText(36, score, width / 2, height - 50);
}

// displayCountdown()
// Displays a timer counting down
// Once it hits 0, the game over
// Framecount calculation taken from: https://editor.p5js.org/marynotari/sketches/S1T2ZTMp-
function displayCountdown() {

    // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    if (frameCount % 60 == 0 && timer > 0) {
        timer--;
    } else if (timer == 0) {
        state = `endGame`;
    }
    push();
    fill(`#909eba`);
    displayText(24, timer, width / 2, 50);
    pop();
}

// mouseClicked()
// click events
// Switch states
// Reinitialized money & score
function mouseClicked() {
    if (state == `menu`) {
        // Click on text [CLICK TO ACCEPT JOB] to proceed
        let d1 = dist(mouseX, mouseY, width / 2.1, height / 1.1);
        if (d1 < userMG.size) {
            state = `startGame`
            $(`.selectJob button`).hide();
            $(`.btn-return`).hide();
        }
    }
    // when the game ends
    // updates the datamoney 
    // Reloads the page at the end
    else if (state == `endGame`) {
        let d1 = dist(mouseX, mouseY, width / 2.1, height / 1.1);
        if (d1 < userMG.size) {
            dataM += scoreMoney;
            dataMoney = dataM;
            localStorage.setItem(`dataMoney`, JSON.stringify(dataMoney));

            addCoinImg();
            resetGame();

            $(`.selectJob button`).show();
            $(`.btn-return`).show();
        }
    }

    // Check if the user clicked on the mouse when the game is not over
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

// STATES
//  ---------------------------------------------------------------------
// menuGame()
// instructions
function menuGame() {
    // Titles
    push();
    fill(`#54d6`);
    displayText(32, INSTRUCTION_TEXT[0], width / 2.1, height / 5.5);
    displayText(32, INSTRUCTION_TEXT[1], width / 2.1, height / 2.25)
    displayText(32, INSTRUCTION_TEXT[2], width / 2.1, height / 1.5)
    pop();

    // MINIGAME 1
    if (minigame1) {
        push();
        fill(`#54d6`);
        displayText(56, TITLE_TEXT[0], width / 2.1, height / 15);
        pop();
        // Texts
        push();
        fill(`#2d67dc`);
        displayText(28, INSTRUCTION_TEXT[3], width / 2.1, height / 3.5);
        displayText(28, INSTRUCTION_TEXT[4], width / 2.1, height / 1.85);
        displayText(28, INSTRUCTION_TEXT[5], width / 2.1, height / 1.35);
        pop();
    }
    // MINIGAME 2
    else if (minigame2) {
        push();
        fill(`#54d6`);
        displayText(56, TITLE_TEXT[1], width / 2.1, height / 15);
        pop();
        push();
        fill(`#2d67dc`);
        displayText(28, INSTRUCTION_TEXT[6], width / 2.1, height / 3.5);
        displayText(28, INSTRUCTION_TEXT[7], width / 2.1, height / 1.85);
        displayText(28, INSTRUCTION_TEXT[8], width / 2.1, height / 1.35);
        pop();
    }

    // CLICK TO PLAY
    push();
    fill(`#909eba`);
    displayText(24, INSTRUCTION_TEXT[9], width / 2.1, height / 1.1);
    pop();
}

// startGame()
// Displays all elements needed for the game
function startGame() {

    // Minigame 1
    if (minigame1) {
        displayHoles(125, height / 5, 150, 4, 250);
        displayHoles(125, height / 1.5, 150, 4, 250);
        displayMouse(125, height / 1.5, 150, 4, 250);
    }

    // Minigame 2
    else if (minigame2) {
        for (let i = 0; i < NUM_FISHIES; i++) {
            let fish = fishies[i];
            fish.display();
            fish.move();
            fish.checkFish();
        }

    }
    displayScore();
    displayCountdown();
}

// endGame() 
// Set the gameOver bool to true
// Displays the end screen with the amount earned
function endGame() {

    gameOver = true;
    // Calculating money earned based on performance
    // MINIGAME 1
    // Score 1-10: 1$
    // Score 11-20: 2$
    // Score 21-30: 3$
    // Score 31+: 5$
    // Score 0: 0$
    if (minigame1) {
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
    }

    // MINIGAME 2
    // Score 1-90: 1$
    // Score 91-100: 2$
    // Score 0: 0$
    if (minigame2) {

        if (score > 0 && score <= 90) {
            scoreMoney = 1;
        } else if (score >= 91) {
            scoreMoney = 2;
        } else if (score == 0) {
            scoreMoney = 0;
        }
    }

    // Displays the money earned into the user's wallet
    displayText(42, `score: ` + score, width / 2, height / 2);
    displayText(42, `You earned: ` + scoreMoney + "$", width / 2, height / 1.75);

    // CLICK TO ACCEPT REWARD
    push();
    fill(`#909eba`);
    displayText(24, INSTRUCTION_TEXT[10], width / 2.1, height / 1.1);
    pop();
}


// Resets the minigames
// Puts everything back to initial states
// Calls back the setup
// ClearInterval
// Recalls fishes 
function resetGame() {

    gameOver = false;
    state = `menu`;

    scoreMoney = 0;
    score = 0;

    setup();

    // clearInterval of mouse 
    if (minigame1) {
        clearInterval(mousePosInterval);
    }
    // Resets the fishies
    if (minigame2) {
        for (let i = 0; i < NUM_FISHIES; i++) {
            let fish = fishies[i];
            fish.reset();
        }
    }
}


// addCoinImg()
// Add an image element to the .coins div of the same value of the score money
function addCoinImg() {
    switch (scoreMoney) {
        case 0:
            break;
        case 1:
            $(`<img>`).attr(`src`, `assets/images/coins/coin-1.png`).addClass(`coin coin-1`).appendTo(`.coins`);
            break;
        case 2:
            $(`<img>`).attr(`src`, `assets/images/coins/coin-2.png`).addClass(`coin coin-2`).appendTo(`.coins`);
            break;
        case 3:
            $(`<img>`).attr(`src`, `assets/images/coins/coin-1.png`).addClass(`coin coin-1`).appendTo(`.coins`);
            $(`<img>`).attr(`src`, `assets/images/coins/coin-2.png`).addClass(`coin coin-2`).appendTo(`.coins`);
            break;
        case 4:
            break;
        case 5:
            $(`<img>`).attr(`src`, `assets/images/coins/coin-1.png`).addClass(`coin coin-1`).appendTo(`.coins`);
            $(`<img>`).attr(`src`, `assets/images/coins/coin-2.png`).addClass(`coin coin-2`).appendTo(`.coins`);
            $(`<img>`).attr(`src`, `assets/images/coins/coin-2.png`).addClass(`coin coin-2`).appendTo(`.coins`);
            break;
    }
}

// Change between the minigames
$(`.selectJob button`).on(`click`, function (event) {
    switch ($(this).attr(`class`)) {
        // PREVIOUS button
        case `previous`:
            if (minigame1) {
                minigame1 = false;
                minigame2 = true;
            } else if (minigame2) {
                minigame2 = false;
                minigame1 = true;
            }
            break;
            // NEXT button
        case `next`:
            if (minigame2) {
                minigame2 = false;
                minigame1 = true;
            } else if (minigame1) {
                minigame1 = false;
                minigame2 = true;
            }
            break;
    }
});


