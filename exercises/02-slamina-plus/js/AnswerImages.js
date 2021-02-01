// Image class
// Definining an fruit and displays image depending on the answer 
class AnswerImages {
    constructor(img) {
        this.img = img;
        this.x = width/1.25;
        this.y = height/2;
        this.size = 150;
    }

    update() {
        this.display();
    }

    display() {
        push();
        imageMode(CENTER);
        image(this.img,this.x,this.y,this.size,this.size);
        pop();
    }

    hide() {
        push();
        tint(255, 0);
        image(this.img,this.x,this.y,this.size,this.size);
        pop();
    }

    // mousePressed() {
    //     if(currentAnswer == currentFruit) {
    //         this.img = orangeImg;
    //     }
    //     else if(currentAnswer != currentFruit){
    //         this.img = tomatoImg;
    //     }
    // }
}