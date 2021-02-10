"use strict";
/*****************
JSON
Stephanie Dang
******************/

let jokeText = ``; // The current joke.

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  // Display the current joke
  push();
  fill(255, 255, 0);
  textSize(32);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  text(jokeText, width / 2, height / 2, width / 2, height / 2);
  pop();
}

function mousePressed() {
  // Load a random joke from the API...
  loadJSON("https://official-joke-api.appspot.com/jokes/programming/random", setJoke);
}

function setJoke(data) {
  // We get the joke object as the first element of the array
  let joke = data[0];
  // Set the joke text as the setup and punchline properties together
  jokeText = `${joke.setup}\n\n${joke.punchline}`;
}
