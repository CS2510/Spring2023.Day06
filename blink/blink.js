let time = 0
let up = true

let mainScene = new Scene();

mainScene.update = function(){
    if (up) {
        time++;
        if(time == 255)
            up = false
    }
    else {
        time--
        if(time == 0){
            up = true
        }
    }
}

mainScene.draw = function(){
    ctx.fillStyle = `rgb(0, ${time} ,0)`

    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

SceneManager.addScene(mainScene);