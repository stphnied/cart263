// 1st screen : Loading screen
// Displays a loading circle animation
function mainMenu() {
    background(RED_COLOR);
    // Setting the canva drawing lines to dashed lines
    canvas.drawingContext.setLineDash([1, 55]);

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

function instruction() {
    canvas.drawingContext.setLineDash([]);
    // baymaxConfig = {
    //     face: {
    //         x: width / 2.05,
    //         y: height / 2,
    //         w: 300,
    //         h: 250,
    //         eyeL: {
    //             x: width / 2.5,
    //             y: height / 2,
    //             size: 30
    //         },
    //         eyeR: {
    //             x: width / 1.75,
    //             y: height / 2,
    //             size: 30
    //         }
    //     },
    //     body: {
    //         x: width / 2.02,
    //         y: height,
    //         w: 500,
    //         h: 800,
    //         roundness: 200
    //     }
    // };
    baymax.display();


}

function gameplay() {}

function ending() {}