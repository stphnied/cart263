"use strict";

/*****************

Week 02
Stephanie Dang

This week's topic and experiments includes :
-Constant
-Object parameters
-First-class functions

******************/

// preload()
// Description of preload

const
    PI = 3.147,
    NUM_CIRCLE = 10;

let 
    circleSizeIncrease = 50,
    circleAlpha = 50;

function preload() {

}


function setup() {
    createCanvas(500, 500);
}


function draw() {
    background(0);

    // 2.1 video
    drawFancyCircle();

    // 2.2 video
    let config = {
        x: 250,
        y: 250,
        w: 200,
        h: 200,
        fillColor: {
            r: 255,
            g: 255,
            b: 0
        },
        mode: CENTER
    }
    drawFancyRect(config);

}

// 2.1 Constant
function drawFancyCircle() {
    circleAlpha = map(mouseX, 0, width, 10, 100);
    circleSizeIncrease = map(mouseY, 0, height, 10, 100);

    for (let i = 0; i < NUM_CIRCLE; i++) {
        push();
        fill(255, circleAlpha);
        ellipse(width / 2, height / 2, i * circleSizeIncrease);
        pop();
    }
}

// 2.2 Object param
function drawFancyRect({x,y,w,h,fillColor,mode}) {
    push();
    fill(fillColor.r, fillColor.g, fillColor.b);
    rectMode(mode);
    rect(x, y, w, h);
    pop();
}
