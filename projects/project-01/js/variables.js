// Variables
let state = `menu`;
// canvas property
let canvas;
// Font
let myFont;
// username 
let hurt = false;
// angle of rotation
let angle = 0;
// Baymax visual
let baymax = {
    face: {
        x: undefined,
        y: undefined,
        w: undefined,
        h: undefined,
        eyeL: {
            x:undefined,
            y:undefined,
            size:undefined
        },
        eyeR: {
            x:undefined,
            y:undefined,
            size:undefined
        },
    },
    body: {
        x: undefined,
        y: undefined,
        w: undefined,
        h: undefined,
        roundness: undefined
    }
};

let dialoguesData;
// Constant for colors
const
    BLACK_COLOR = `#171d22`,
    RED_COLOR = `#FF1919`,
    WHITE_COLOR = 250;
const
    ACENTONE_FONT_URL = `assets/fonts/ACETONE.otf`;
const
    dialogue_JSON_URL = `js/dialogues.json`;
