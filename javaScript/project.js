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
app.loader.add('stand', 'images/stand.png')
app.loader.add('drawer', 'images/drawer.png')

// Variables
let play = 0
let fade = 0
let checkFade = 0
let check = 0
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

    const bar = new PIXI.Sprite(resources.stand.texture)
    bar.scale.x = 6
    bar.scale.y = 6

    const left = new PIXI.Sprite(resources.drawer.texture)
    left.scale.x = 6
    left.scale.y = 6

    const right = new PIXI.Sprite(resources.drawer.texture)
    right.scale.x = 6
    right.scale.y = 6

    const title = new PIXI.Text("Play", {fontFamily: 'PixeloidSans', fill: '0xFFFFFF', fontSize: 100})

    title.interactive = true;
    title.buttonMode = true;
    title.on("pointerdown", doPointerDown);

    app.stage.interactive = true;
    app.stage.on("pointermove", move) 

    // Rectangle is the entire size of the screen
    const screen = new PIXI.Graphics();

    screen.drawRect(0, 0, window.innerWidth, window.innerHeight);
    screen.addChild(title)

    const black_screen = new PIXI.Graphics();

    black_screen.beginFill(0x000000)
    black_screen.drawRect(0, 0, window.innerWidth, window.innerHeight);
    black_screen.alpha = 0

    black_screen.scale.x = 100
    black_screen.scale.y = 100

    // Adds the rectangle to the screen and others children assigned to it
    app.stage.addChild(screen);
    app.stage.addChild(black_screen)

    function doPointerDown() {
        play += 1
    }

    function fade_out(number) {
        if (number === 1) {
            fade += .004

            if (fade === checkFade + .004) {
                checkFade += .004
                black_screen.alpha -= .004
            }

            if (fade >= 1) {
                checkFade = 0
                play = 3
                fade = 0
            }
        }
    }

    function fade_in(number) {
        if (number === 1) {
            fade += .01
            if (fade === checkFade + .01) {
                checkFade += .01
                black_screen.alpha += .01
            }

            if (fade >= 1) {
                screen.removeChild(title)
                checkFade = 0
                play = 2
                fade = 0
            }
        }
    }

    function move(e) {
        let pos = e.data.global
        
        check = pos.x
    }

    // Calls code inside here every millisecond
    app.ticker.add((time) => {

        title.x = window.innerWidth / 2
        title.y = window.innerHeight / 2
        title.anchor.set(0.5)

        bar.x = window.innerWidth / 2
        bar.y = window.innerHeight / 2
        bar.anchor.set(0.5)

        if (play === 1) {
            fade_in(1)
        }

        if (play === 2) {
            screen.addChild(bar)
            fade_out(1)
        }

        if (play === 3) {
            if (check <= 300) {
                screen.addChild(left)
                left.x = 0
                left.y = window.innerHeight / 2
                left.anchor.set(0.5)
            } else if (check >= 1100) {
                screen.addChild(right)
                right.x = window.innerWidth / 2
                right.y = window.innerHeight / 2
                right.anchor.set(0.5)
            } else {
                screen.removeChild(left)
                screen.removeChild(right)
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

