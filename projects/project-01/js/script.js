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
// ------------------------------------------------------------------------
function preload() {
    // Font ---
    myFont = loadFont(ACENTONE_FONT_URL);

    // JSON data ---
    dialoguesData = loadJSON(dialogue_JSON_URL);

    // Images ---
    // Background images (landscapes and windows)
    for (let i = 0; i < 2; i++) {
        let bgImg = loadImage(`${LANDSCAPE_IMG_URL}${i}.png`);
        let windowImg = loadImage(`${WINDOW_IMG_URL}${i}.png`)
        bgImgs.push(bgImg);
        windowImgs.push(windowImg);
    }

    // Pain level images
    for (let i = 0; i < NUM_PAIN_SCALE; i++) {
        let painImg = loadImage(`${PAIN_LEVEL_IMG}${i}.png`);
        painImgs.push(painImg);
    }

    // Body scan image
    scanImg = loadImage(SCAN_IMG_URL);

    // Sounds ---
    // Clicking sound
    clickSfx = loadSound(CLICK_SFX_URL);
}


// setup()
// Setting up the canvas, Annyang, video capture
// ------------------------------------------------------------------------
function setup() {
    // Create canvas ---
    canvas = createCanvas(1000, windowHeight);
    // Changing the angle mode to DEGREE ---
    angleMode(DEGREES);
    // Create Baymax ---
    baymax = new Baymax();

    // Annyang ---
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

    // Set up Day/Night switch button position
    dayBtn.x = width - 50;
    dayBtn.y = height - 50;

    // Video capture ---
    // Set up video and hide
    video = createCapture(VIDEO);
    video.hide();
}

// Create pain-scale images
function createPainImg() {

    for (let i = 0; i < NUM_PAIN_SCALE; i++) {
        let x = painPos[i];
        let y = 120;
        let painImg = painImgs[i];
        let pain = new Pain(x, y, painImg, i);
        pains.push(pain);
        pains[i].update();
    }
}

// draw()
// Manage different states
// ------------------------------------------------------------------------
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


// Data storing function
// Storing the user's name in Localstorage
// ------------------------------------------------------------------------
function saveName() {
    if (state == `mainMenu`) {
        username.name = prompt(`Provide your name here`, `[Name]`);
        localStorage.setItem(`user-name`, JSON.stringify(username));
        state = `instruction`;
        console.log(username.name);
    }
}

// Displaying functions
// ------------------------------------------------------------------------

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

// Display the background for the  gameplay state
function displayBg() {
    push();
    // Configuration the image position
    let bgConfig = {
        x: 0,
        y: 0,
    }
    // Background image move according to the mouse position
    bgConfig.x = map(mouseX, 0, width, 0, 25);
    bgConfig.y = map(mouseY, 0, height, 0, 15);
    // Display landscape image
    if (dayTime) {
        image(bgImgs[0], bgConfig.x, bgConfig.y);
        image(windowImgs[0], 0, 0);
    } else {
        image(bgImgs[1], bgConfig.x, bgConfig.y);
        image(windowImgs[1], 0, 0);
    }
    pop();
}

// Displays an illusion of set of rotating  circles
// Using a circle stroke and lined dashed
function displayLoadingCircle(config) {
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
        setTimeout(callGameplay, 3000);
    }
    // displays circle
    ellipse(config.x, config.y, config.w, config.h);
    pop();
}

function callGameplay() {
    state = `gameplay`;
}

// Display button to trigger the day/night time
function displayDayBtn() {
    push();
    // DAY
    if (dayTime) {
        stroke(ORANGE_COLOR.r, ORANGE_COLOR.g - 30, ORANGE_COLOR.b);
        strokeWeight(3);
        fill(ORANGE_COLOR.r, ORANGE_COLOR.g, ORANGE_COLOR.b);
    }
    // NIGHT
    else {
        stroke(BLUE_COLOR.r, BLUE_COLOR.g - 30, BLUE_COLOR.b);
        strokeWeight(3);
        fill(BLUE_COLOR.r, BLUE_COLOR.g, BLUE_COLOR.b);
    }
    ellipse(dayBtn.x, dayBtn.y, dayBtn.size);
    pop();

}


// Mouse & Key pressed functions
// ------------------------------------------------------------------------

// keypressed()
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

// mousePressed()
// Mouse events
function mousePressed() {
    if (state == `gameplay`) {
        for (let i = 0; i < pains.length; i++) {
            pains[i].clicked();
        }
        // Triggers a random catchprase from Baymax
        baymax.clickLogo();

        // Switch between daytime and nightime background
        let d = dist(mouseX, mouseY, dayBtn.x, dayBtn.y);
        if (d < dayBtn.size / 2) {
            if (dayTime) {
                dayTime = false
            } else {
                dayTime = true;
            }
        }
    }
}