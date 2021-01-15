// Animal class
// Definining an animal and displays its image
class Animal {
    // Stores pos and image as propreties
    // Create an angle propety for potential rotation
    // Generate random number to reverse the img
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.angle = 0;
        this.randomNb = random([-1, 1]);
    }

    // Calls the display() method
    update() {
        this.display();
    }

    // Displays this animal's image on the canvas at its position and rotation
    display() {
        push();
        imageMode(CENTER);
        translate(this.x, this.y);
        rotate(this.angle);
        scale(this.randomNb, 1);
        image(this.image, 0, 0);
        pop();
    }

    // Checks whether the position x,y is inside this animal's image
    // Return true if click was inside the img and false otherwise
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