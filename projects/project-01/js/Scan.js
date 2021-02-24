// Class Scan
// Everything related to the scanning screen
// Displays symptons, temperature and analyse the user
// Contains video capture
class Scan {
    constructor(video) {
        // Video 
        this.vid = video;
        this.x = width/2;
        this.y = height/2;
        this.w = width - 20;
        this.h = height - 20;
        // Text number
        this.nsp = 0;
        this.ecq = 0;
        // 
        this.rectX = width / 2;
        this.rectY = 5;
        this.rectW = width;
        this.rectH = 50;
        this.speed = 10;
        // Tint
        this.tint = {
            r:100,
            g:153,
            b:204
        };
    }

    // Calls the functions below
    update() {
        this.displayVideo();
        this.displayImg();
        this.displayText();


        if(this.ecq < 69) {
            this.ecq++;
        }
        if(this.nsp < 113){
            this.nsp += int(random(1,5));
        }
    }

    // Displays the webcam/video capture
    displayVideo() {
        background(0);
        push();
        imageMode(CENTER);
        tint(this.tint.r, this.tint.g, this.tint.b);
        image(this.vid, this.x, this.y, this.w, this.h);
        pop();
    }

    // Display image of scan
    displayImg() {
        push();
        tint(this.tint.r, this.tint.g, this.tint.b,200);
        image(scanImg, 25, 250, 150,250);
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

        // NSP NUMBER
        displayText(`
    ${this.nsp}/90  80`, 38, -5, height / 1.17, WHITE_COLOR, LEFT, LEFT);
        pop();

        // ECQ
        push()
        displayText(`
     ECQ`, 18, 20, height / 1.1, WHITE_COLOR, CENTER, LEFT);

    //  Display ECQ number
        displayText(this.ecq, 38, 40, height / 1.02, WHITE_COLOR, CENTER, LEFT);
        pop();
    }

    // Draws and displays lines onto the vid capture
    drawLines(linesConfig) {
        push();
        noStroke();
        fill(this.tint.r,this.tint.g,this.tint.b,50);
        rectMode(linesConfig.mode);
        rect(linesConfig.x, linesConfig.y, linesConfig.w, linesConfig.h);
        pop();
    }
}