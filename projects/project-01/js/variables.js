// Variables
let state = `menu`;
// canvas property
let canvas;
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
}
// Constant for colors
const
    BLACK_COLOR = `#171d22`,
    RED_COLOR = `#FF1919`;


// Dialogues
let dialogues = [
    
]