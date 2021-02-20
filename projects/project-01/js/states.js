// 1st screen : Loading screen
// User has to state their name
function mainMenu() {
    displayText(`
    Greetings,
    please state your name while we boot the system.`, 42, width / 2, 200,BLACK_COLOR);
    // Ask for user's name after 2s
    setTimeout(saveName, 2000);
}

// 2nd screen: Instruction
// Gives instruction to proceed to next step
// Displays a loading circle animation
function instruction() {
    background(RED_COLOR);
    // Setting the canva drawing lines to dashed lines
    canvas.drawingContext.setLineDash([1, 55]);
    displayText(username.name, 42,width/2,100,0,50);
    displayText(`
    To activate BAYMAX one must be hurt.
    Pinch yourself and say "ouch".
    `, 32, width / 2, height / 4, 0, 50);

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

function gameplay() {
    canvas.drawingContext.setLineDash([]);
    background(0);
    baymax.display();

    createPainImg();
}

function ending() {}