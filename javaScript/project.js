const app = new PIXI.Application({
    // When changing background color: change "#" -> "0x" and include no quotation marks.
    backgroundColor: 0x1099bb,
    resizeTo: window,
})

document.body.appendChild(app.view);

const SCALE = 1;

// Adds an image assigned to a variable. 
app.loader.add('test', 'images/cat.png')
app.loader.add('test2', 'images/dog.png')

// This is a function that takes and names a varible and an image.
// Write anything PIXI in here: 
app.loader.load((loader, resources) => {
    
    const cat = new PIXI.Sprite(resources.test.texture);
    const dog = new PIXI.Sprite(resources.test2.texture);
    
    dog.x = (cat.x + 50) * 4.5
    dog.y = 0
    dog.scale.x = SCALE / 3
    dog.scale.y = SCALE / 3

    app.stage.addChild(cat)

    app.stage.addChild(dog)

})

