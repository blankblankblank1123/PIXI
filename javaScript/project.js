const app = new PIXI.Application({
    // When changing background color: change "#" -> "0x" and include no quotation marks.
    backgroundColor: 0x1099bb,
    resizeTo: window,
})

document.body.appendChild(app.view);

// This is a function that takes and names a varible and an image.
// Write anything PIXI in here: 
app.loader.load((loader, resources) => {

    // Creates a rectangle/container for other variables
    const big = new PIXI.Graphics();

    big.beginFill(0x1099bb);
    big.drawRect(0, 0, window.innerWidth, window.innerHeight);
    app.stage.addChild(big);

 
    // Calls code inside here every millisecond
    app.ticker.add((time) => {


    })
})

