class Mouse {
    constructor(img) {
        this.x = 125;
        this.y = height / 1.5;
        this.image = img;
        this.rX = [125, 375, 625, 875];
        this.rY = [height / 1.5, height / 5];
        this.size = 150;
        this.spacing = 250;
        this.rTime = random(250, 760);

    }

    update() {
        this.display();
        this.checkMouse();
    }

    display() {
        push();
        imageMode(CENTER);
        image(this.image, this.x, this.y, this.size);
        pop();
    }
    move() {
        this.x = random(this.rX);
        this.y = random(this.rY);
    }

    checkMouse() {
        if (this.overlap(mouseX, mouseY)) {
            score++;
        }
        this.x += this.lineSpace;
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