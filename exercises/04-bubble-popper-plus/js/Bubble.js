// Bubble class
class Bubble {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.vx = 0;
        this.vy = random(-5,-1);
        this.color = 0;
        this.activeColor = false;
    }

    // display the bubble apperance
    // if touched = fills the bubble
    display() {
        push();
        if (!this.activeColor) {
            stroke(ORANGE_COLOR);
            strokeWeight(2);
            noFill();
        } else if(this.activeColor){
            this.touched = true;
            noStroke();
            fill(ORANGE_COLOR);
        }
        // display bubble
        ellipse(this.x, this.y, this.size);
        pop();
    }

    move() {
        // move bubble
        this.x += this.vx;
        this.y += this.vy;
        // Moves bubble back down if reach top
        if (this.y < 0) {
            this.reset();
        }
    }

    // reset bubble's position to bottom
    reset() {
        this.x = random(width);
        this.y = height;
    }

    // lits up the bubbles
    lit() {
        let d = dist(pin.tip.x, pin.tip.y, this.x, this.y);
        if (d < this.size / 2) {
            this.activeColor = true;
            this.touched = true;
            this.addingScore();
        }
    }

    // adds a count each time a bubble lit up
    addingScore() {
        if(this.activeColor) {
            bubblesCounter++;
            console.log(bubblesCounter);
        }
        // when they all lit up, show ending screen
        if (bubblesCounter == numBubbles) {
            state = `ending`;
        }
    }
}