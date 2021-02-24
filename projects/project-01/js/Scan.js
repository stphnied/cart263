// Class Scan
// Everything related to the scanning screen
// Displays symptons, temperature and analyse the user
// Contains video capture
class Scan {
    construction() {
        this.w = width - 20;
        this.h = height - 20;
        this.nsp = undefined;
        this.ecq = undefined;
    }

    // Calls the functions below
    update() {
        this.displayVideo();
        this.displayImg();
        this.displayText();
    }

    // Displays the webcam/video capture
    displayVideo() {
        background(0);
        push();
        imageMode(CENTER);
        tint(100, 153, 204);
        image(video, width / 2, height / 2, width - 20, height - 20);
        pop();
    }

    // Display image of scan
    displayImg() {
        push();
        tint(100, 153, 204);
        image(scanImg, 25, 250, 150, 200);
        pop();
    }

    // Displays texts on canva/video
    displayText() {
        // Underline Title
        push();
        strokeWeight(1);
        stroke(255);
        line(25, 105, 175, 105);
        pop();
        // Symptoms text
        push();
        displayText(`SYMPTOMS:`, 32, 100, 100, WHITE_COLOR, CENTER, CENTER);
        displayText(`
    Scanning...
    Body Temp. Normal
    Respiration Normal
    Elevated Heart Rate
    Skin Inflammation
    `, 18, 20, 100, WHITE_COLOR, CENTER, LEFT);
        displayText
        pop();
        push();
        displayText(username.name, 43, width / 1.1, height / 1.1, WHITE_COLOR, CENTER, CENTER);
        pop();

        //NSP TEXT
        push();
        displayText(`
    NSP    19.55   mmHg`, 18, 20, height / 1.2, WHITE_COLOR, CENTER, LEFT);

        // NSP NUMBERS
        // Increment the NSP & ECQ value
        // this.ncp = 0;
        // this.nsp++;
        displayText(`
    ${this.nsp}/90  80`, 38, -5, height / 1.17, WHITE_COLOR, LEFT, LEFT);
        pop();


        // ECQ
        push()
        displayText(`
     ECQ`, 18, 20, height / 1.1, WHITE_COLOR, CENTER, LEFT);
        
        this.ecq = 0;
        while (this.ecq < 69) {
            this.ecq++;
            console.log(this.ecq);
        }
        displayText(this.ecq, 38, 40, height / 1.02, WHITE_COLOR, CENTER, LEFT);
        pop();
    }

    // Draws and displays lines onto the vid capture
    drawLines(linesConfig) {
        push();
        fill(linesConfig.color);
        rectMode(linesConfig.mode);
        rect(linesConfig.x, linesConfig.y, linesConfig.w, linesConfig.h);
        pop();
    }
}