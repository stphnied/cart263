// 1st screen : Loading screen
// Displays a loading circle animation
function mainMenu() {
    background(RED_COLOR);
    // Setting the canva drawing lines to dashed lines
    // Changing the angle mode to DEGREE
    canvas.drawingContext.setLineDash([1,55]);
    angleMode(DEGREES);
    displayText(`
    To activate BAYMAX
    state your name by saying "My name is [name]"
    `,32,width/2,height/4,0,50);
    loadingCircle();

}

function instruction() {
        canvas.drawingContext.setLineDash([]);
    angleMode(DEGREES);
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
    rect(x, y, w, h, [tl], [tr], [br], [bl])
    pop();
}

function gameplay() {}

function ending() {}