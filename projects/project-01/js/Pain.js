// Pain (image) class
// and how I'm actually feeling too
class Pain {
    constructor(x, y, image, number) {
        this.x = x; // position x
        this.y = y; //position y
        this.image = image; // pain image
        this.number = number; // pain number (add +1 bc starts at 0)
    }

    // Calls display function
    update() {
        this.display();
    }

    //Displays pain-level visuals on the canvas
    display() {
        // Displaying the scale of 1-10
        displayText(`From a scale of 1-10, select your pain:`, 32, width / 2, 50, WHITE_COLOR, CENTER, CENTER);
        for (let i = 0; i < NUM_PAIN_SCALE; i++) {
            displayText(`${i}`, 24, painPos[i] - 100, this.y + 80, WHITE_COLOR, CENTER, CENTER);
        }
        // Displaying last number bc the loop won't :(
        displayText(`10`, 24, painPos[9], this.y + 80, WHITE_COLOR, CENTER, CENTER);
        // Displaying images
        push();
        imageMode(CENTER);
        image(this.image, this.x, this.y, 80, 80);
        pop();
    }

    // displays a background rectangle for the images
    displayRect() {
        // rectangle border
        push();
        // noFill();
        fill(WHITE_COLOR, 150);
        strokeWeight(3);
        stroke(WHITE_COLOR, 100);
        rectMode(CENTER);
        rect(width / 2, 120, width, 110, 10);
        pop();
    }

    // clicked on image
    clicked() {
        if (this.overlap(mouseX, mouseY)) {
            let painLvl;
            if (this.number <= 5) {
                painLvl = 0;
            } else if (this.number >= 6 && this.number < 9) {
                painLvl = 1
            } else if (this.number == 9) {
                painLvl = 2
            }
            // clickSfx.play();
            responsiveVoice.speak("You have selected level"+(this.number+1)+"Which is"+dialoguesData.dialogues.levels[painLvl], "UK English Male", {});

            setTimeout(() => {
                phraseNum=4;
            }, 5000);

        }

    }

    hover() {
        if (this.overlap(mouseX, mouseY)) {
            if (!clickSfx.isPlaying()) {
                // clickSfx.play();
            }
            // cursor(pointer);
            console.log("hover");
        }
    }

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