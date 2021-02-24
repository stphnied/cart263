// Variables
let state = `gameplay`;
// canvas property
let canvas;
// Font
let myFont;
// Sounds
let clickSfx;
// user state
let hurt = false;
// Background images
let bgImg;
let windowImg;
// baymax object
let baymax;
let baymaxConfig;
// angle of rotation
let angle = 0;
// Data of baymax's dialogues
let dialoguesData;
// Arrays of the loaded images of pain scale
let painImgs = [];
let pains = [];
let painPos = [50, 150, 250, 350, 450, 550, 650, 750, 850, 950];
// Username object
let username = {
    name: ``
};
// video tag
let video;
// Image of bodyscan
let scanImg;
// Keeping track of baymax's lines
let baymaxTalkTrack =0;
// line pos
let linePosY=[];
// CONSTANTS
// Constant for colors
const
    BLACK_COLOR = (23, 29, 34),
    RED_COLOR = `#FF1919`,
    WHITE_COLOR = 250,
    GREY_COLOR = 230;
let redColor = (255, 25, 25);
// Constant for URLs
const
    ACENTONE_FONT_URL = `assets/fonts/ACETONE.otf`;
const
    dialogue_JSON_URL = `js/dialogues.json`;

// Constants for images
const
    LANDSCAPE_MORNING_IMG_URL = `assets/images/landscape-2.png`,
    LANDSCAPE_NIGHT_IMG_URL = `assets/images/landscape-2.png`,
    WINDOW_IMG_URL = `assets/images/window.png`,
    PAIN_LEVEL_IMG = `assets/images/pain-scale/pain-`,
    SCAN_IMG_URL = `assets/images/bodyscan.png`;

// Constant for number of images
const
    NUM_PAIN_SCALE = 10;
// Constant for sounds
const 
    CLICK_SFX_URL = `assets/sounds/click.mp3`;
