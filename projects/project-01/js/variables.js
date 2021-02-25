// Variables

// Setup variables
// ------------------------------------------------------------------------
// current state
let state = `mainMenu`;
// canvas property
let canvas;
// Font
let myFont;

// User relate 
// ------------------------------------------------------------------------
// Username object
let username = {
    name: ``
};
// user state
let hurt = false;
let hurtTimer;

// UI relate
// ------------------------------------------------------------------------
// time of the day
let dayTime = true;
// button
let dayBtn = {
    x:undefined,
    y:undefined,
    size:30
};
// Background images
let bgImgs = [];
// let windowImg;
let windowImgs = [];

// Baymax relate
// ------------------------------------------------------------------------
// baymax object
let baymax;
let baymaxConfig;
// angle of rotation
let angle = 6;
// Data of baymax's dialogues
let dialoguesData;
// Indicator of the current talk state of Baymax
let phraseNum = 0;

// Pain relate
// ------------------------------------------------------------------------
// Arrays of the loaded images of pain scale
let pain;
let painImgs = [];
let pains = [];
let painPos = [50, 150, 250, 350, 450, 550, 650, 750, 850, 950];

// Scanning relate
// ------------------------------------------------------------------------
// video tag
let video;
// Image of bodyscan
let scanImg;
let scan;
// line pos
let linePosY = [];

// Sounds
// ------------------------------------------------------------------------
let clickSfx;


// CONSTANTS
// ------------------------------------------------------------------------
// Constant for colors
const
    BLACK_COLOR = (23, 29, 34),
    RED_COLOR = `#FF1919`,
    ORANGE_COLOR = {
        r: 255,
        g: 90,
        b: 10
    };
    BLUE_COLOR = {
        r: 34,
        g: 36,
        b: 255
    };
    WHITE_COLOR = 250,
    GREY_COLOR = 230;
let redColor = (255, 25, 25);
// Constant for URLs
const
    ACENTONE_FONT_URL = `assets/fonts/ACETONE.otf`;
const
    dialogue_JSON_URL = `assets/data/dialogues.json`;

// Constants for images
const
    LANDSCAPE_IMG_URL = `assets/images/landscape-`,
    WINDOW_IMG_URL = `assets/images/window-`,
    PAIN_LEVEL_IMG = `assets/images/pain-scale/pain-`,
    SCAN_IMG_URL = `assets/images/bodyscan.png`;

// Constant for number of images
const
    NUM_PAIN_SCALE = 10;
// Constant for sounds
const
    CLICK_SFX_URL = `assets/sounds/click.mp3`;


