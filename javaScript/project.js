const app = new PIXI.Application({
    // When changing background color: change "#" -> "0x" and include no quotation marks.
    backgroundColor: 0x1099bb,
    resizeTo: window,
})

document.body.appendChild(app.view);

// Adds an image assigned to a variable. 
app.loader.add('test', 'images/cat.png')
app.loader.add('test2', 'images/dog.png')

// This is a function that takes and names a varible and an image.
// Write anything PIXI in here: 
app.loader.load((loader, resources) => {
    
    const cat = new PIXI.Sprite(resources.test.texture);
    const dog = new PIXI.Sprite(resources.test2.texture);
    
    dog.x = app.renderer.width / 2
    dog.y = app.renderer.height / 2
    dog.scale.x = 1 / 3
    dog.scale.y = 1 / 3

    app.stage.addChild(cat)

    app.stage.addChild(dog)

})

