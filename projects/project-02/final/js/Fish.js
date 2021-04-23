/**
Project 2: Gachapyon
Stephanie Dang.

This script is dedicated to the minigame 2 :Fish class
- Manages the fishes 
    - Display
    - Movement
*/

class Fish {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.w = 40;
        this.h = 25;
        this.vx = 0.25;
        this.vy = 0.25;
        this.speed = 10;
        this.image = image;
        this.active = true;
        this.eaten = false;
    }

    update() {
        this.move();
        this.display();
        this.checkFish();
    }

    // Move the fishies randomly within the canvas
    move() {
        let change = random(0, 1);
        if (change < 0.05) {
            this.vx = random(-this.speed, this.speed);
            this.vy = random(-this.speed, this.speed);
        }
        // Move the this
        this.x += this.vx;
        this.y += this.vy;
        this.x = constrain(this.x, 0, width);
        this.y = constrain(this.y, 0, height);
    }

    // Display the fishies
    display() {
        if (!this.eaten) {
            push();
            image(this.image, this.x, this.y, this.w, this.h);
            pop();
        }

    }

    // 
    checkFish() {
        if (!this.eaten) {
            if (this.overlap(mouseX, mouseY)) {
                this.active = false;
                this.eaten = true;
                score++;
            }
        }

    }

    // overlap()
    // ------------------------------------------------------------------------
    // Checks if the pos x,y is inside the image
    // Return true if the user clicked was inside the img
    // Else false
    overlap(x, y) {
        if (x > this.x - this.image.width / 2 &&
            x < this.x + this.image.width / 2 &&
            y > this.y - this.image.height / 2 &&
            y < this.y + this.image.height) {

            return true

        } else {
            return false;
        }
    }
}