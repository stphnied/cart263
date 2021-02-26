// 1st screen : Loading screen
// User has to state their name
// ------------------------------------------------------------------------
function mainMenu() {
    displayText(`GREETINGS`, 56, width / 2, 250, BLACK_COLOR, CENTER, CENTER);
    displayText(`please state your name while we boot the system.`, 42, width / 2, 300, BLACK_COLOR, CENTER, CENTER);
    push();
    textFont(myFont);
    fill(RED_COLOR);
    textAlign(CENTER, CENTER);
    textSize(24);
    text(`WARNING`, width / 2, height / 1.4);
    pop();

    displayText(`
    Please read these terms and conditions carefully before using Our Service.
    Our program BAYMAX will analyze you thoroughly and identify you with your name,
    voice and physical state. You are authorizing us to scan your personal information
    in order to better service. Information obtained from your results are solely to confirm
    your identity and your wellbeing. By continuing to access or use Our Service,
    You agree to be bound by our terms. If You do not agree with our terms, in whole or in part,
    please do not activate our program and be warned.
`, 24, width / 2, height / 1.2, BLACK_COLOR, 55, CENTER, CENTER);

    baymax.displayEndFace(BLACK_COLOR);
    // Ask for user's name after 2s
    setTimeout(saveName, 4000);
}

// 2nd screen: Instruction
// Gives instruction to proceed to next step
// Displays a loading circle animation
// ------------------------------------------------------------------------
function instruction() {
    background(RED_COLOR);
    // Setting the canva drawing lines to dashed lines
    canvas.drawingContext.setLineDash([1, 55]);
    displayText(username.name, 56, width / 2, 100, 0, 50, CENTER, CENTER);
    displayText(`
    To activate BAYMAX one must be hurt.
    Pinch yourself and say "ouch".
    `, 32, width / 2, height / 4, 0, 50, CENTER, CENTER);

    // circle configuration
    let config = {
        x: 0,
        y: 0,
        w: 300,
        h: 300,
        color: 2,
        weight: 20,
        mode: CENTER
    }
    // loads and display circles
    displayLoadingCircle(config);
}

// 3rd screen: Gameplay
// Displays Baymax and it's functionality
// ------------------------------------------------------------------------
function gameplay() {
    // Clears the setTimeout function that calls the gameplay state
    clearTimeout(callGameplay);
    // sets line dash to default
    canvas.drawingContext.setLineDash([]);
    // cool bg
    displayBg();

    // baymax
    baymax.update();
    baymax.talk();

    // Play scanning sounds when it's video capture time
    if (phraseNum == 5) {
        if (!scanningSfx.isPlaying()) {
            scanningSfx.play();
            scanningSfx.setVolume(0.05);
        }
    }
    
    // Hiding Video
    // Hide Btn
    // Stops scanning sound
    if (phraseNum != 5) {
        push();
        displayDayBtn();
        video.hide();
        scanningSfx.stop();
        pop();

        // If passed the scanning stage:
        // Display info and tips
        if (phraseNum > 5) {
            displayInfo();
            // Assign random tip
            if (!tipActivate) {
                setInterval(() => {
                    randomTip = int(random(0, 4));
                }, 8000);
                tipActivate = true;
            }
            // display tip
            displayTip(randomTip);

        }
    }
}

// 4th screen: Ending
// Ending screen when user deactivates Baymax
// ------------------------------------------------------------------------
function ending() {
    background(RED_COLOR);
    let onlyPlayOnce = false;
    if (!responsiveVoice.isPlaying() && !onlyPlayOnce) {
        responsiveVoice.speak(dialoguesData.dialogues.deactivate[0], "UK English Male", {
            pitch: 1.1
        });
        onlyPlayOnce = true;
    }
    displayText(`THANK YOU FOR USING MY SERVICE.`, 42, width / 2, height / 2, WHITE_COLOR, 250, CENTER, CENTER);
    displayText(`press [ENTER] to reactivate me.`, 32, width / 2, height / 1.75, BLACK_COLOR, 150, CENTER, CENTER);

    baymax.displayEndFace(WHITE_COLOR);
    displayText(`
    BIG
    HERO
    263`,
        24, width - 2, height - 100, WHITE_COLOR, 50, RIGHT, RIGHT);
}