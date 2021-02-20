// Baymax class
class Baymax {
    constructor() {
        // Face
        this.faceX = width / 2.05;
        this.faceY = height / 2;
        this.faceW = 300;
        this.faceH = 250;
        // Eyes
        this.eyeLX = width/2.5;
        this.eyeLY = height/2;
        this.eyeRX = width/1.75;
        this.eyeRY = height/2;
        this.eyeSize = 30;
        // Body
        this.bodyX = width/2.02;
        this.bodyY = height;
        this.bodyW = 500;
        this.bodyH = 800;
        this.bodyRound = 200;
    }

    display() {
        ellipseMode(CENTER);
        // Head
        push();
        noStroke();
        fill(255);
        ellipse(this.faceX, this.faceY, this.faceW, this.faceH, this.faceH);
        pop();

        // Facial expression
        push();
        strokeWeight(3);
        stroke(BLACK_COLOR);
        // Mouth
        line(this.eyeLX, this.eyeLY, this.eyeRX, this.eyeRY);

        // Eyes
        fill(BLACK_COLOR);
        // Left eye
        ellipse(this.eyeLX, this.eyeLY, this.eyeSize);
        // Right eye
        ellipse(this.eyeRX, this.eyeRY, this.eyeSize);
        pop();

        //body
        push();
        noStroke();
        rectMode(CENTER);
        rect(this.bodyX, this.bodyY, this.bodyW, this.bodyH, this.bodyRound);
        pop();
    }

    // Activating Baymax
    activate() {
        responsiveVoice.speak(`Activating...`, "Korean Male", {});
        hurt = true;
    }

    talk() {
        responsiveVoice.speak(dialoguesData.dialogues.intro[0], "UK English Male", {});
    }

}