// Default name
let userName = `stranger`

function setup() {
  createCanvas(windowWidth, windowHeight);
    console.log("Say: My name is [name].")

  if (annyang) {
    let command = {
      // A command that listens for "my name is..." and the captures
      // whatever they say after that and sends it as an argument to setName()
      'My name is *name': setName
    }
    annyang.addCommands(command);
    annyang.start();
  }
}

// Sets the current username to whatever argument is passed to it by annyang!
// Now how what the user said will be passed into the parameter called name
function setName(name) {
  userName = name;
}

function draw() {
  background(0);

  // Greet the user
  push();
  fill(255, 255, 0);
  textSize(32);
  rectMode(CENTER);
  text(`Hi there, ${userName}!`, 100, 100);
  pop();
}