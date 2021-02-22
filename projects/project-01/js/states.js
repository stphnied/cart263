// 1st screen : Loading screen
// User has to state their name
function mainMenu() {
    displayText(`GREETINGS`, 56, width / 2, 250, BLACK_COLOR, CENTER, CENTER);
    displayText(`please state your name while we boot the system.`, 42, width / 2, 300, BLACK_COLOR, CENTER, CENTER);
    // Ask for user's name after 2s
    setTimeout(saveName, 4000);
}

// 2nd screen: Instruction
// Gives instruction to proceed to next step
// Displays a loading circle animation
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
    loadingCircle(config);
}

// 3rd screen: Gameplay
// Displays Baymax and it's functionality
function gameplay() {
    canvas.drawingContext.setLineDash([]);
    background(0);
    baymax.display();
    createPainImg();


    // Scanning only last for 10 seconds
    if (false) {
        // Calls the scanning function that uses capture video
        scanning();
        // Random Y positions for the lines
        for (let i = 0; i < 15; i++) {
            linePosY.push(random() + random(5, height));
        }
        // Configuration for the lines effect
        for (let i = 0; i < 50; i++) {
            let linesConfig = {
                x: width / 1.5,
                y: linePosY[i] += 10,
                w: windowWidth,
                h: 1.25,
                color: 'rgba(0,100,200, 0.25)',
                mode: CENTER
            }
            drawLines(linesConfig);

            // Lines restarts on top
            if (linePosY > 1000) {
                linePosY = 0;
            }
        }
    }

}

// 4th screen: Ending
// Ending screen when user deactivates Baymax
function ending() {}