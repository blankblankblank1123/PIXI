const app = new PIXI.Application({
    // When changing background color: change "#" -> "0x" and include no quotation marks.
    backgroundColor: 0x1099bb,
    resizeTo: window,
})

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

class Keyboard {
    constructor () {
        this.pressed = {};
    }

    watch (el) {
        el.addEventListener('keydown', (e) => {
            console.log(e.key);
            this.pressed[e.key] = true;
        })
        el.addEventListener('keyup', (e) => {
            this.pressed[e.key] = false;
        })
    }
}

app.view.setAttribute('tabindex', 0);

// Loads images
app.loader.add('wall', 'images/wall.png')

// Variables
let play = 0
let fade = 0
let checkFade = 0

document.body.appendChild(app.view);

// This is a function that takes and names a varible and an image.
// Write anything PIXI in here: 
app.loader.load((loader, resources) => {

    // Adds keyboard to screen
    let kb = new Keyboard();
    kb.watch(app.view); 

    const big = new PIXI.Sprite(resources.wall.texture);
    app.stage.addChild(big);
    
    big.scale.x = 100
    big.scale.y = 100

    const title = new PIXI.Text("Play", {fontFamily: 'PixeloidSans', fill: '0xFFFFFF', fontSize: 100})

    title.interactive = true;
    title.buttonMode = true;
    title.on("pointerdown", doPointerDown);

    const screen = new PIXI.Graphics();

    // Rectangle is the entire size of the screen
    screen.drawRect(0, 0, window.innerWidth, window.innerHeight);
    screen.addChild(title)

    // Adds the rectangle to the screen and others children assigned to it
    app.stage.addChild(screen);

    function doPointerDown() {
        play += 1
    }

    // Calls code inside here every millisecond
    app.ticker.add((time) => {
        
        title.x = window.innerWidth / 2
        title.y = window.innerHeight / 2
        title.anchor.set(0.5)

        if (play === 1) {
            fade += .01
            if (fade === checkFade + .01) {
                checkFade += .01
                title.alpha -= .01
            }

            if (fade >= 1) {
                screen.removeChild(title)
                checkFade = 0
                play = 0
                fade = 0
            }
        }

        // width.text = window.innerWidth
        // height.text = window.innerHeight

        // if (kb.pressed.ArrowRight) {
        //     player.x += 5
        //     big.addChild(player)
        // }

        // if (kb.pressed.ArrowLeft) {
        //     player.x -= 5
        // }

        // if (kb.pressed.ArrowDown) {
        //     player.y += 5
        // }

        // if (kb.pressed.ArrowUp) {
        //     player.y -= 5
        // }

    })
})

