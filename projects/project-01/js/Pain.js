// Pain (image) class
// and how I'm actually feeling too
class Pain {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
    }

    // Calls display function
    update() {
        this.display();
    }

    //Displays pain-level images on the canvas
    display() {

        // Displaying the scale of 1-10
        displayText(`From a scale of 1-10, select your pain:`, 32, width / 2, 100, WHITE_COLOR);
        for (let i = 0; i < NUM_PAIN_SCALE; i++) {
            displayText(`${i}`, 24, painPos[i] - 100, this.y + 80, WHITE_COLOR);
        }
        // Displaying last number bc the loop won't :(
        displayText(`10`, 24, painPos[9], this.y + 80, WHITE_COLOR);

        // rectangle border
        push();
        noFill();
        strokeWeight(3);
        stroke(WHITE_COLOR);
        rectMode(CENTER);
        // rect(x, y, w, h, [tl], [tr], [br], [bl])
        rect(width / 2, this.y, width, 110, 10);
        pop();

        push();
        imageMode(CENTER);
        image(this.image, this.x, this.y, 80, 80);
        pop();
    }

    

    // Checks if the pos x,y is inside the image
    // Return true if the user clicked was inside the img
    // Else false
    overlap(x, y) {
        if (x > this.x - this.image.width / 2 &&
            x < this.x + this.image.width / 2 &&
            y > this.y - this.image.height / 2 &&
            y < this.y + this.image.height) {
            return true;
        } else {
            return false;
        }
    }
}