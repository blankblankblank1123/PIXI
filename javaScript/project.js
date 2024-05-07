const app = new PIXI.Application({
    // When changing background color: change "#" -> "0x" and include no quotation marks.
    backgroundColor: 0x1099bb,
    width: 1366,
    height: 768
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
app.loader.add('beans', 'images/coffee_grounds.png')
app.loader.add('leaves', 'images/tea_grounds.png')

// Variables
let play = 0
let fade = 0
let checkFade = 0
let check = 0
let ingredients = 0
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

    const coffee_beans = new PIXI.Sprite(resources.beans.texture)
    coffee_beans.scale.x = 2
    coffee_beans.scale.y = 2

    coffee_beans.interactive = true;
    coffee_beans.buttonMode = true;
    coffee_beans.on("pointerover", doBeanText);
    coffee_beans.on("pointerout", removeBeanText)

    const tea_leaves = new PIXI.Sprite(resources.leaves.texture)
    tea_leaves.scale.x = 2
    tea_leaves.scale.y = 2

    tea_leaves.interactive = true;
    tea_leaves.buttonMode = true;
    tea_leaves.on("pointerover", doTeaText);
    tea_leaves.on("pointerout", removeTeaText)

    const title = new PIXI.Text("Play", {fontFamily: 'PixeloidSans', fill: '0xFFFFFF', fontSize: 100})
    const beanFlavoredText = new PIXI.Text("Coffee Grounds", {fontFamily: 'PixeloidSans', fill: '0xFFFFFF', fontSize: 50})
    const teaFlavoredText = new PIXI.Text("Tea Leaves", {fontFamily: 'PixeloidSans', fill: '0xFFFFFF', fontSize: 50})

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

    function doBeanText() {
        screen.addChild(beanFlavoredText)
    }

    function removeBeanText() {
        screen.removeChild(beanFlavoredText)
    }

    function doTeaText() {
        screen.addChild(teaFlavoredText)
    }

    function removeTeaText() {
        screen.removeChild(teaFlavoredText)
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
                left.x = 165
                left.y = window.innerHeight / 2
                left.anchor.set(0.5)
                ingredients = 1

            } else if (check >= 1066) {
                screen.addChild(right)
                right.x = 1201 
                right.y = window.innerHeight / 2
                right.anchor.set(0.5)

                ingredients = 0
            } else {
                screen.removeChild(left)
                screen.removeChild(right)
                ingredients = 0
            }
        }

        if (ingredients === 1) {
            screen.addChild(coffee_beans)
            
            coffee_beans.x = 100
            coffee_beans.y = 65
            coffee_beans.anchor.set(0.5)
        
            beanFlavoredText.x = window.innerWidth / 2
            beanFlavoredText.y = 75
            beanFlavoredText.anchor.set(0.5)
            
            screen.addChild(tea_leaves)

            tea_leaves.x = 225
            tea_leaves.y = 65
            tea_leaves.anchor.set(0.5)

            teaFlavoredText.x = window.innerWidth / 2
            teaFlavoredText.y = 75
            teaFlavoredText.anchor.set(0.5)  
        } else {
            screen.removeChild(coffee_beans)
            screen.removeChild(tea_leaves)
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

