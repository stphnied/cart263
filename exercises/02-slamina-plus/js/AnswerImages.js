// Image class
// Definining an fruit and displays image depending on the answer 
    // Stores image as propreties
    // fixed position x and y 
    // fixed image size
class AnswerImages {
    constructor(img) {
        this.img = img;
        this.x = width/1.25;
        this.y = height/2;
        this.size = 150;
        this.randomSpeed = random(-1,1);
    }

    // Calls the display() method
    update() {
        this.display();
    }

    // Displays the answer's image on the canvas 
    display() {
        push();
        imageMode(CENTER);
        translate(random(-2,2),random(-2,2));
        image(this.img,this.x,this.y,this.size,this.size);
        pop();
    }

    // Hides the answer's image by using tint()
    hide() {
        push();
        tint(255, 0);
        image(this.img,this.x,this.y,this.size,this.size);
        pop();
    }
}