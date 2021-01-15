// SausageDog
// An extension of the Animal class
// Adds the of being found when clicked -> spins if true
class SausageDog extends Animal {
    constructor(x, y, image) {
        super(x, y, image);
        this.found = false;
        this.rotationSpeed = 0.25;
    }

    // Calls the super update() and changes angle if found
    update() {
        super.update();
        if (this.found) {
            this.angle += this.rotationSpeed;
            displayText(`YOU FOUND ME!`, 32, this.x, this.y - 100, `red`);
            setTimeout(() => {
                state = `end`;
            }, 2000);
        }
    }
    // Checks if this sausage was clicked and remembers it was found
    mousePressed() {
        if (!this.found && this.overlap(mouseX, mouseY)) {
            this.found = true;
            barkSFX.play();
        }
    }

}