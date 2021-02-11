"use strict";

/*****************

Spy profile generator
Stephanie Dang

When the user first loads our program it will ask for their name in a text prompt.
Once provided, the program will generate and save the user’s super secret spy profile using random JSON data to determine an alias,
secret weapon, and password. When the user comes back later, they will need to enter their generated password to view their profile again.

// password : disruption
******************/

let spyProfile = {
    name: `**REDACTED**`,
    alias: `**REDACTED**`,
    secretWeapon: `**REDACTED**`,
    password: `**REDACTED**`
};
let tarotData;
let objectData;
let instrumentData;

const
    COLOR_GREEN = `#39FF14`,
    COLOR_BLACK = `#000000`;

// preload()
// Description of preload
function preload() {

    tarotData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/divination/tarot_interpretations.json`);
    objectData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/objects/objects.json`);
    instrumentData = loadJSON(`https://raw.githubusercontent.com/dariusk/corpora/master/data/music/instruments.json`);
}

// setup()
// Creating canvas
// Displays the generated profile if there is one
// Users has to enter correct password
// If wrong do nothing
function setup() {
    createCanvas(windowWidth, windowHeight);

    let data = JSON.parse(localStorage.getItem(`spy-profile-data`));
    if (data !== null) {
        let password = prompt(`What's your code?`);
        if (password === data.password) {
            spyProfile = data;
        }
    }
    else {
        generateSpyProfile();
    }
}


// draw()
// Description of draw()
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

function generateSpyProfile() {
    let card = random(tarotData.tarot_interpretations);

    spyProfile.name = prompt(`Identify yourself, Agent`, `name`);
    spyProfile.alias = `the ${random(instrumentData.instruments)}`;
    spyProfile.secretWeapon = random(objectData.objects);
    spyProfile.password = random(card.keywords);

    //Saving generated profile
    localStorage.setItem(`spy-profile-data`, JSON.stringify(spyProfile));
}