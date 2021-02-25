// Baymax class
class Baymax {
    constructor() {
        // Face
        this.faceX = width / 2.05;
        this.faceY = height / 2;
        this.faceW = 300;
        this.faceH = 250;
        // Eyes
        this.eyeLX = width / 2.5;
        this.eyeLY = height / 2;
        this.eyeRX = width / 1.75;
        this.eyeRY = height / 2;
        this.eyeW = 30;
        this.eyeDefaultH = 30;
        this.eyeH = this.eyeDefaultH;
        // blinking
        this.blinkInterval = 5000;
        this.blinkSpeed;
        this.blinking = true;
        this.closing = true;
        // Body
        this.bodyX = width / 2.02;
        this.bodyY = height;
        this.bodyW = 500;
        this.bodyH = 800;
        this.bodyRound = 200;
        // Speed
        this.vx = 0;
        this.vy = 0.5;
    }

    // Calls display and blink function
    update() {
        this.display();
        this.blink();

    }

    // Displaying Baymax visual
    // ------------------------------------------------------------------------
    display() {
        ellipseMode(CENTER);
        noStroke();
        // Head
        push();
        fill(WHITE_COLOR);
        ellipse(this.faceX, this.faceY, this.faceW, this.faceH, this.faceH);
        pop();

        // Facial expression
        push();
        strokeWeight(3);
        stroke(BLACK_COLOR);
        // Mouth
        line(this.eyeLX, this.eyeLY, this.eyeRX, this.eyeRY);
        pop();

        //body
        push();
        fill(WHITE_COLOR);
        rectMode(CENTER);
        rect(this.bodyX, this.bodyY, this.bodyW, this.bodyH, this.bodyRound);

        // Lower body
        ellipse(this.bodyX, this.bodyY, this.bodyW + 110, this.bodyH, this.bodyRound);
        pop();

        // Logo
        push()
        stroke(222);
        strokeWeight(3)
        fill(GREY_COLOR);
        ellipse(this.bodyX * 1.2, this.bodyY / 1.5, 40, 40, this.bodyRound);
        pop();
    }

    // Blink eyes
    // Inspired by : https://editor.p5js.org/rustyrobison/sketches/MNL1RC6sf
    // ------------------------------------------------------------------------
    blink() {
        // Close eyes
        if (this.blinking) {
            if (this.closing && this.eyeH > 0) {
                this.eyeH -= 3;
                if (this.eyeH <= 0) {
                    this.closing = false;
                }
            }
            // Open eyes
            else {
                this.eyeH += 3;
                if (this.eyeH >= this.eyeDefaultH) {
                    this.blinking = false;
                }
            }
        }

        if (this.eyeH >= 30 && !this.closing) {
            setTimeout(() => {
                this.blinking = true;
                this.closing = true;
            }, 1000);
        }

        // console.log(this.eyeH);
        this.eyeH = constrain(this.eyeH, 0, 30);
        fill(BLACK_COLOR);
        // Left eye
        ellipse(this.eyeLX, this.eyeLY, this.eyeW, this.eyeH);
        // Right eye
        ellipse(this.eyeRX, this.eyeRY, this.eyeW, this.eyeH);

    }

    // Activating Baymax
    // Trigger a Baymax's line
    // Will launch the circles in the displayLoadingCircle() in script.js line 171
    // ------------------------------------------------------------------------
    activate() {
        if (state == `instruction`) {
            responsiveVoice.speak(`Activating...`, "UK English Male", {pitch:1.1});
            hurt = true;
        }
    }

    // Automatic phrases and action by baymax
    // ------------------------------------------------------------------------
    talk() {
        switch (phraseNum) {
            // Introduce himself
            case 1:
                if(!responsiveVoice.isPlaying()){
                    responsiveVoice.speak(dialoguesData.dialogues.intro[0], "UK English Male", {pitch:1.1});
                    phraseNum++;
                }
                break;
                // Says: On a scale of 1-10...
            case 2:
                responsiveVoice.speak(dialoguesData.dialogues.intro[1], "UK English Male", {pitch:1.1});
                phraseNum++;
                break;
                // Show pain scale --> Calls 
            case 3:
                pain.displayRect();
                for (let i = 0; i < NUM_PAIN_SCALE; i++) {
                    pains[i].update();
                    pains[i].hover();
                }
                break;
                // Says : Will scan...
            case 4:
                responsiveVoice.speak(dialoguesData.dialogues.intro[2], "UK English Male", {pitch:1.1});
                phraseNum++;
                break;
                // Calls scanUser()
            case 5:
                scanUser();
                break;
                // Says Scan results
            case 6:
                responsiveVoice.speak(dialoguesData.dialogues.scanning[0], "UK English Male", {pitch:1.1});
                phraseNum++;
                break;
                // Stops all automated voice lines
            case 7:
                // responsiveVoice.cancel();
                break;
        }

    }

    // Checks if user mouse is over the logo
    // ------------------------------------------------------------------------
    clickLogo() {
        let d = dist(mouseX, mouseY, this.bodyX * 1.2, this.bodyY / 1.5);
        if (d < 40 / 2) {
            console.log("hola");
            responsiveVoice.speak(random(dialoguesData.dialogues.random), "UK English Male", {});
        }
    }

    // Display Baymax's sleeping face
    displayEndFace(color) {
        push()
        stroke(color, 200);
        strokeWeight(4)
        fill(color, 100);
        // Mouth
        line(this.eyeLX - 12, this.eyeLY / 1.2, this.eyeRX + 12, this.eyeRY / 1.2);
        // Left eye
        strokeWeight(2);
        ellipse(this.eyeLX, this.eyeLY / 1.2, this.eyeW, this.eyeH);
        // Right eye
        ellipse(this.eyeRX, this.eyeRY / 1.2, this.eyeW, this.eyeH);
        pop();
    }

}