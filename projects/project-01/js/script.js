"use strict";

/*****************

A Night at the Movies --> A Day with Baymax!
Stephanie Dang

Introducing BAYMAX, your personal healthcare robot from the movie BIG HERO 6.
User has to provide their name before the program can load
User has to pinch themselves and say ouch to activate baymax
Baymax is now activated.
- Press on Baymax's logo to trigger a phrase
- Say "I am satisfied with my care" to deactivate baymax
- Say Ouch to select pain level
******************/

// preload()
// Loads font, dialogue data, images
function preload() {
    // Font
    myFont = loadFont(ACENTONE_FONT_URL);
    // JSON data
    dialoguesData = loadJSON(dialogue_JSON_URL);
    // Images
    bgImg = loadImage(LANDSCAPE_MORNING_IMG_URL);
    windowImg = loadImage(WINDOW_IMG_URL);

    for (let i = 0; i < NUM_PAIN_SCALE; i++) {
        let painImg = loadImage(`${PAIN_LEVEL_IMG}${i}.png`);
        painImgs.push(painImg);
    }
    scanImg = loadImage(SCAN_IMG_URL);
    // Sounds
    clickSfx = loadSound(CLICK_SFX_URL);
}

// setup()
// Setting up the canvas, Annyang
function setup() {
    // create canvas
    canvas = createCanvas(1000, windowHeight);
    // Changing the angle mode to DEGREE
    angleMode(DEGREES);
    // Create Baymax
    baymax = new Baymax();

    // Check if annyang is available
    if (annyang) {
        // Create commands
        let commands = {
            'Ouch': baymax.activate
        };

        // Add and calls commands
        annyang.addCommands(commands);
        annyang.start();
    }

    // Set up video and hide
    video = createCapture(VIDEO);
    video.hide();
}

// draw()
// Manage different states
function draw() {
    background(244);
    // Calls the different state
    switch (state) {
        case `mainMenu`:
            mainMenu();
            break;
        case `instruction`:
            instruction();
            break;
        case `gameplay`:
            gameplay();
            break;
        case `ending`:
            ending();
            break;
    }
}

// Displays an illusion of set of rotating  circles
// Using a circle stroke and lined dashed
function loadingCircle(config) {
    push()
    translate(width / 2, height / 1.8);
    rotate(angle);
    noFill();
    stroke(config.color, 100);
    strokeWeight(config.weight);
    ellipseMode(config.mode);
    // If true animates the circle and go to next screen
    if (hurt) {
        config.color = WHITE_COLOR;
        stroke(config.color, 255);
        angle += radians(50);
        setTimeout(() => {
            state = `gameplay`;
            baymax.talk();
        }, 3000);
    }
    // displays circle
    ellipse(config.x, config.y, config.w, config.h);
    pop();
}

// Going onto next state when pressing `ENTER`
// Debugging made easier
function keyPressed() {
    if (state == `mainMenu`) {
        if (keyCode === ENTER) {
            state = `instruction`;
        }
    } else if (state == `instruction`) {
        if (keyCode === ENTER) {
            state = `gameplay`;
        }
    } else if (state == `ending`) {
        if (keyCode == ENTER) {
            location.reload();
        }
    }
}

function mousePressed() {
    if (state == `gameplay`) {
        for (let i = 0; i < pains.length; i++) {
            pains[i].clicked();
        }
        baymax.clickLogo();
    }
}

// Text configuration
function displayText(string, size, x, y, color, alpha, alignH, alignV) {
    push();
    textAlign(alignH, alignV);
    textSize(size);
    fill(color, alpha);
    textFont(myFont);
    text(string, x, y);
    pop();
}

// Storing the user's name in Localstorage
function saveName() {
    if (state == `mainMenu`) {
        username.name = prompt(`Provide your name here`, `[Name]`);
        localStorage.setItem(`user-name`, JSON.stringify(username));
        state = `instruction`;
        console.log(username.name);
    }
}

// Create pain-scale images
function createPainImg() {
    for (let i = 0; i < NUM_PAIN_SCALE; i++) {
        let x = painPos[i];
        let y = 200;
        let painImg = painImgs[i];
        let pain = new Pain(x, y, painImg, i);
        pains.push(pain);
        pains[i].update();
    }
}

// Display the background for the  gameplay state
function displayBg() {
    push();
    // Configuration the image position
    let bgConfig = {
        x: 0,
        y: 0,
    }
    // Background image move according to the mouse position
    bgConfig.x = map(mouseX,0,width,0,25);
    bgConfig.y = map(mouseY,0,height,0,15);
    // Display landscape image
    image(bgImg, bgConfig.x, bgConfig.y);
    pop();
    // Wall/window image
    image(windowImg, 0, 0);

}