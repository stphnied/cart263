// 1st screen : Loading screen
// Displays a loading circle animation
function mainMenu() {
    background(RED_COLOR);
    // Setting the canva drawing lines to dashed lines
    canvas.drawingContext.setLineDash([1,55]);
 
    displayText(`
    To activate BAYMAX one must be hurt.
    Pinch yourself and say "ouch".
    `,32,width/2,height/4,0,50);

    // circle configuration
     let config = {
      x:0,
      y:0,
      w:300,
      h:300,
      color:2,
      weight:20,
      mode:CENTER
    }
    // loads and display circles
    loadingCircle(config);
}

function instruction() {
    canvas.drawingContext.setLineDash([]);
    push();
    noStroke();
    fill(255);
    ellipseMode(CENTER);
    ellipse(width / 2.05, height / 2, 300, 250);
    pop();

    push();
    fill(BLACK_COLOR);
    strokeWeight(3)
    stroke(BLACK_COLOR)
    line(width / 2.2, height / 2, width / 1.9, height / 2);
    ellipseMode(CENTER);
    ellipse(width / 2.2, height / 2, 30);
    ellipse(width / 1.9, height / 2, 30);
    pop();

    push();
    noStroke();
    rectMode(CENTER);
    rect(width / 2.02, height, 500, 800, 200, 200, 0);
    pop();
}

function gameplay() {}

function ending() {}