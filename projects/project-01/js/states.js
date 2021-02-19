function mainMenu() {

    push();
    noStroke();
    fill(255);
    ellipseMode(CENTER);
    ellipse(width/2.05, height/2, 300,250);
    pop();

    push();
    fill(BLACK_COLOR);
    strokeWeight(3)
    stroke(BLACK_COLOR)
    line(width/2.2,height/2,width/1.9,height/2);
    ellipseMode(CENTER);
    ellipse(width/2.2, height/2, 30);
    ellipse(width/1.9, height/2, 30);
    pop();

    push();
    noStroke();
    rectMode(CENTER);
    rect(width/2.02,height,500,800,200,200,0);
    rect(x, y, w, h, [tl], [tr], [br], [bl])
    pop();
}

function instruction() {}

function gameplay() {}

function ending() {}