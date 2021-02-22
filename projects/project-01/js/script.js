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
    }
    else if(state ==`ending`) {
        if(keyCode == ENTER) {
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


// Scanning the user
// Use webcam
// Display Symptoms,Name, BodyScan
// Scanning Lines
function scanning() {
    background(0);
    // Webcam
    push();
    imageMode(CENTER);
    tint(100, 153, 204);
    image(video, width / 2, height / 2, width - 20, height - 20);
    pop();

    // Underline Title
    push();
    strokeWeight(1);
    stroke(255);
    line(25, 105, 175, 105);
    pop();

    // Text
    push();
    displayText(`SYMPTOMS:`, 32, 100, 100, WHITE_COLOR, CENTER, CENTER);
    displayText(`
    Scanning...
    Body Temp. Normal
    Respiration Normal
    Elevated Heart Rate
    Skin Inflammation
    `, 18, 20, 100, WHITE_COLOR, CENTER, LEFT);
    displayText
    pop();
    // Display username's name
    push();
    displayText(username.name, 43, width / 1.1, height / 1.1, WHITE_COLOR, CENTER, CENTER);
    pop();

    // Scan img
    push();
    tint(100, 153, 204);
    image(scanImg, 25, 250, 150, 200);
    pop();

}

// Drawing lines onto the video capture
function drawLines(linesConfig) {
    push();
    fill(linesConfig.color);
    rectMode(linesConfig.mode);
    rect(linesConfig.x, linesConfig.y, linesConfig.w, linesConfig.h);
    pop();
}