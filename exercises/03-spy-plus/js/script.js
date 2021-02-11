"use strict";

/*****************

Spy profile generator ++
Stephanie Dang

When the user first loads our program it will ask for their name in a text prompt.
Once provided, the program will generate and save the user’s super secret spy profile using random JSON data to determine an alias,
secret weapon, and password. When the user comes back later, they will need to enter their generated password to view their profile again.

** NEW FEATURES
- Annyang
- More categories (headquaters,companion)
- Create new profile
- Delete account

******************/

// Variables
let state = `menu`;
// Spy profile data displays
let spyProfile = {
    name: `**REDACTED**`,
    alias: `**REDACTED**`,
    secretWeapon: `**REDACTED**`,
    password: `**REDACTED**`
};

// Var to store JSON data
let tarotData;
let objectData;
let instrumentData;
let dogData;
let countryData;

// Array to store rect y positions
let yPos = [];

// Constants
// URL to data
const
    TAROT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`,
    OBJECT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`,
    INSTRUMENT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`,
    DOG_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/animals/dogs.json`,
    COUNTRY_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/geography/countries.json`;
// Colors code
const
    COLOR_GREEN = `#39FF14`,
    COLOR_BLACK = `#000000`;


// preload()
// Loads all the JSON data
function preload() {
    tarotData = loadJSON(TAROT_DATA_URL);
    objectData = loadJSON(OBJECT_DATA_URL);
    instrumentData = loadJSON(INSTRUMENT_DATA_URL);
    dogData = loadJSON(DOG_DATA_URL);
    countryData = loadJSON(COUNTRY_DATA_URL);
}

// setup()
// Creating canvas and handles loadings profile data
// Generating new profile if none
function setup() {
    // creates canvas
    createCanvas(windowWidth, windowHeight);

    // Check if annyang is available
    if (annyang) {
        // Create commands
        let commands = {
            'My name is *name': loadProfile
        };

        // Add and calls commands
        annyang.addCommands(commands);
        annyang.start();
    }

}


// Called by annyang
// Loads an agent profile if there is one if not creates a new one
function loadProfile(name) {
    let data = JSON.parse(localStorage.getItem(`spy-profile-data`));
    state = `mainpage`;
    // Checks if there's data
    if (data !== null) {
        // If name is in data
        if (name === data.name) {
            // Asks for password
            let password = prompt(`What's your code?`);
            // If matches, displays profile
            if (password === data.password) {
                spyProfile = data;
            }
        } else {
            generateSpyProfile();
        }
    } else {
        generateSpyProfile();
    }
}

// draw()
// Displays current state
function draw() {
    background(COLOR_BLACK);

    switch (state) {
        case "menu":
            menu();
            break;
        case "mainpage":
            mainpage();
            break;
    }
}

// Generates spy profile from JSON data
function generateSpyProfile() {
    // Ask for agent's name and stores it
    spyProfile.name = prompt(`You're new huh? Write your name down here`, `name`);
    // random instrument
    spyProfile.alias = `the ${random(instrumentData.instruments)}`;
    // random location
    spyProfile.headquater = random(countryData.countries);
    // random object
    spyProfile.secretWeapon = random(objectData.objects);
    // random companion
    spyProfile.companion = random(dogData.dogs);
    // random tarot card as password
    let card = random(tarotData.tarot_interpretations);
    spyProfile.password = random(card.keywords);
    //Saving generated profile
    localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}

// Press enter to delete profile
function keyPressed() {
    if (state == `mainpage`) {
        if (keyCode === ENTER) {
            alert(`You have terminated your contract. Goodbye ${spyProfile.name}`);
            localStorage.removeItem(`spy-profile-data`);
            location.reload();
            console.log("pressed");
        }
    }
}

// Text configuration
function displayText(string, size, x, y, color) {
    push();
    textAlign(CENTER, CENTER);
    textSize(size);
    fill(color);
    textFont(`Courier, monospace`);
    text(string, x, y);
    pop();
}

// Drawing multiples rectangle to create a line background
function drawLines(config) {
    push();
    fill(config.color);
    rectMode(config.mode);
    rect(config.x, config.y, config.w, config.h);
    pop();
}