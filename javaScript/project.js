const app = new PIXI.Application({
    // When changing background color: change "#" -> "0x" and include no quotation marks.
    backgroundColor: 0x1099bb,
    resizeTo: window,
})

document.body.appendChild(app.view);

const SCALE = 1;

let test = 0;

// Adds an image assigned to a variable. 
app.loader.add('test', 'images/cat.png')
app.loader.add('test2', 'images/dog.png')

// This is a function that takes and names a varible and an image.
// Write anything PIXI in here: 
app.loader.load((loader, resources) => {
    
    // Variables
    let play = new PIXI.Text("Play", {fontFamily: 'Brush Script MT', fontSize: 100})
    let inventory_screen = new PIXI.Text("Inventory", {fontFamily: 'Brush Script MT', fontSize: 100})
    let display = new PIXI.Text("Something went wrong", {fontFamily: 'Brush Script MT', fontSize: 100})
    let back = new PIXI.Text("X", {fontFamily: 'Arial', fontSize: 100})
    let X = window.innerWidth / 2;
    let Y = (window.innerHeight / 2) - 200;
    let inventory = ''
    let check = 0
    

    // Sets the position of play to the center of the screen
    play.x = X
    play.y = Y
    play.anchor.set(0.5)

    display.x = X
    display.y = Y
    display.anchor.set(0.5)

    inventory_screen.x = X
    inventory_screen.y = Y
    inventory_screen.anchor.set(0.5)

    back.x = X
    back.y = Y
    back.anchor.set(0.5)

    // Makes play interactive
    play.interactive = true;
    play.buttonMode = true;
    play.on("pointerdown", doPointerDown);

    inventory_screen.interactive = true;
    inventory_screen.buttonMode = true;
    inventory_screen.on("pointerdown", doPointerDown1);

    back.interactive = true;
    back.buttonMode = true;
    back.on("pointerdown", doPointerDown2);

    // Creates a rectangle/container for other variables
    const big = new PIXI.Graphics();

    // Rectangle is the entire size of the screen
    big.beginFill(0x1099bb);
    big.drawRect(0, 0, window.innerWidth, window.innerHeight);
    // Adds play into big
    big.addChild(play)

    // Adds the rectangle to the screen and others children assigned to it
    app.stage.addChild(big);

    // On click, removes sprite
    function doPointerDown() {
        if (play.text === "Play") {
            big.removeChild(play)
            big.addChild(inventory_screen)
        } 
    }

    function doPointerDown1() {
        big.removeChild(inventory_screen)
        big.addChild(display)
        big.addChild(back)
    }

    function doPointerDown2() {
        big.removeChild(display)
        big.removeChild(back)
        big.addChild(inventory_screen)
    }

    // Calls code inside here every millisecond
    app.ticker.add((time) => {

        // Centers text to the center of the window
        play.x = X
        play.y = Y
        play.anchor.set(0.5)

        display.x = X
        display.y = Y
        display.anchor.set(0.5)

        inventory_screen.x = X
        inventory_screen.y = Y
        inventory_screen.anchor.set(0.5)

        if (display) {
            back.x = 0
            back.y = 0
            back.anchor.set(0.5)
        }

        if (inventory === '' && check === 0) {
          display.text = "You have nothing" 
        } else if (check === 0) {
            display.text = "You have something"
        }
    })
})

