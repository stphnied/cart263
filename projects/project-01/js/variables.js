// Variables
let state = `menu`;
// canvas property
let canvas;
// Font
let myFont;
// user state
let hurt = false;
// baymax object
let baymax;
let baymaxConfig;
// angle of rotation
let angle = 0;

// Arrays of the loaded images of pain scale
let painImgs =[];

// 
let dialoguesData;
// Constant for colors
const
    BLACK_COLOR = `#171d22`,
    RED_COLOR = `#FF1919`,
    WHITE_COLOR = 250;
// Constant for URLs
const
    ACENTONE_FONT_URL = `assets/fonts/ACETONE.otf`;
const
    dialogue_JSON_URL = `js/dialogues.json`;

// Constants for images
const
    PAIN_LEVEL_IMG = `assets/images/pain-scale/pain-`;
// Constant for number of images
const
    NUM_PAIN_SCALE = 10;