// Bubble class
class Bubble {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.vx = 0;
        this.vy = random(-5, -1);
        this.color = 0;
        this.activeColor = false;
        this.cantTouchTwice = undefined;
    }

    // display the bubble apperance
    // if touched = fills the bubble
    display() {
        push();
        if (!this.activeColor) {
            stroke(ORANGE_COLOR);
            strokeWeight(2);
            noFill();
            this.cantTouchTwice = false;
        } else if (this.activeColor) {
            noStroke();
            fill(ORANGE_COLOR);
            this.cantTouchTwice = true;
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
            // adds a score
            this.addingScore();
            // Plays a igniting sound effect
            if (!igniteSFX.isPlaying()) {
                bgSFX.setVolume(0.5);
                igniteSFX.play();
            }
        }
    }

    // adds a count each time a bubble lit up
    addingScore() {
        if (this.activeColor) {
            console.log(bubblesCounter);
            if (this.activeColor && !this.cantTouchTwice) {
                bubblesCounter++;
            }
        }
    }
}