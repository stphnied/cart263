"use strict";

/*****************

Spy profile generator ++
Stephanie Dang

When the user first loads our program it will ask for their name in a text prompt.
Once provided, the program will generate and save the user’s super secret spy profile using random JSON data to determine an alias,
secret weapon, and password. When the user comes back later, they will need to enter their generated password to view their profile again.

******************/

// Variables
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


// Constants
// URL to data
const
    TAROT_DATA_URL = `https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`,
    OBJECT_DATA_URL= `https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`,
    INSTRUMENT_DATA_URL= `https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`;
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
}

// setup()
// Creating canvas and handles loadings profile data
// Generating new profile if none
function setup() {
    // creates canvas
    createCanvas(windowWidth, windowHeight);
    // load data
    let data = JSON.parse(localStorage.getItem(`spy-profile-data`));
    // Check if there's a data to load
    if (data !== null) {
        // Asks for password
        // If matches, displays profile
        let password = prompt(`What's your code?`);
        if (password === data.password) {
            spyProfile = data;
        }
    }
    // If not, generate a new profile
    else {
        generateSpyProfile();
    }
}

// draw()
// Displays current profile
function draw() {
    background(COLOR_BLACK);

    // string template
    let profile = `** SPY PROFILE **    
    name: ${spyProfile.name}
    alias: ${spyProfile.alias}
    secret weapon: ${spyProfile.secretWeapon}
    password: ${spyProfile.password}`;

    push();
    fill(COLOR_GREEN);
    textSize(32);
    textStyle(BOLD);
    textAlign(TOP, LEFT);
    textFont(`Courier, monospace`);
    text(profile, 100, 100);
    pop();
}


// Generates spy profile from JSON data
function generateSpyProfile() {
    // Ask for agent's name and stores it
    spyProfile.name = prompt(`Identify yourself, Agent`, `name`);
    // random instrument
    spyProfile.alias = `the ${random(instrumentData.instruments)}`;
    // random object
    spyProfile.secretWeapon = random(objectData.objects);
    // random tarot card as password
    let card = random(tarotData.tarot_interpretations);
    spyProfile.password = random(card.keywords);

    //Saving generated profile
    localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}

function keyPressed() {
    if(keyCode === ENTER) {
        // localStorage.removeItem(`spy-profile-date`);
        // generateSpyProfile();
        console.log("pressed");
    }
}