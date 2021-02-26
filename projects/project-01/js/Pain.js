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
    // ------------------------------------------------------------------------
    update() {
        this.display();
    }

    //Displays pain-level visuals on the canvas
    // ------------------------------------------------------------------------
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
    // ------------------------------------------------------------------------
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
    // ------------------------------------------------------------------------
    clicked() {
        if (this.overlap(mouseX, mouseY)) {
            painLvl;
            // No pain
            if (this.number <= 1) {
                painLvl = 0;
            }
            // 
            else if (this.number == 2 || this.number == 3) {
                painLvl = 1;
            }
            // Low pain
            else if (this.number == 4 || this.number ==5) {
                painLvl = 2;
            }
            // Mild pain
            else if (this.number == 6 || this.number == 7) {
                painLvl = 3;
            }
            // Severe pain
            else if (this.number >=8) {
                painLvl = 4;
            }
            clickSfx.play();
            responsiveVoice.speak("You have selected level" + (this.number + 1) + "Which is" + dialoguesData.dialogues.levels[painLvl], "UK English Male", {
                pitch: 1.1
            });

            setTimeout(() => {
                phraseNum = 4;
            }, 5000);
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