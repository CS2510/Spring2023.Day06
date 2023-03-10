let points = 0;

class StartScene extends Scene {
    start(){
        this.freezeTime = 0
        this.maxFreezeTime = 1
    }
    update() {
        this.freezeTime += 25/1000
        if (keysDown["a"] && this.freezeTime >= this.maxFreezeTime) {
            SceneManager.changeScene(1)
        }
    }
    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "white";
        ctx.fillText("Welcome to Pong", 100, 100);
    }

}
class MainScene extends Scene {
    start() {
        this.margin = 20;
        this.size = 100;
        this.pongX = this.margin + this.size / 2
        this.pongY = this.margin + this.size / 2
        this.pongVX = 3
        this.pongVY = 2
        this.paddleX = this.margin + this.size / 2
        this.paddleWidth = 40;
    }
    update() {
        //Model of MVC
        this.pongX += this.pongVX
        this.pongY += this.pongVY

        if (this.pongX > this.margin + this.size) {
            this.pongVX *= -1
        }
        if (this.pongY > this.margin + this.size) {
            //Check for a collision with the paddle
            if (this.paddleX - this.paddleWidth / 2 <= this.pongX && this.paddleX + this.paddleWidth / 2 >= this.pongX) {
                this.pongVY *= -1
                points++
            }
            else {
                console.log("You are dead")
                SceneManager.changeScene(2)
            }
        }
        if (this.pongX < this.margin) {
            this.pongVX *= -1
        }
        if (this.pongY < this.margin) {
            this.pongVY *= -1
        }

        //Update the paddle based on input
        if (keysDown["ArrowLeft"]) {
            this.paddleX -= 2;
        }
        else if (keysDown["ArrowRight"]) {
            this.paddleX += 2
        }

        //Constrain the paddle position
        if (this.paddleX < this.margin + this.paddleWidth / 2) {
            this.paddleX = this.paddleWidth / 2 + this.margin
        }
        if (this.paddleX > this.margin - this.paddleWidth / 2 + this.size) {
            this.paddleX = -this.paddleWidth / 2 + this.margin + this.size
        }
    }
    draw(ctx) {
        //View part of MVC
        ctx.fillStyle = "green"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.strokeStyle = "black"
        ctx.beginPath()
        ctx.moveTo(this.margin, this.margin)
        ctx.lineTo(this.margin + this.size, this.margin)
        ctx.lineTo(this.margin + this.size, this.margin + this.size)
        ctx.moveTo(this.margin, this.margin + this.size)
        ctx.lineTo(this.margin, this.margin)
        ctx.stroke()

        //Now draw the paddle
        ctx.beginPath()
        ctx.moveTo(this.paddleX - this.paddleWidth / 2, this.margin + this.size)
        ctx.lineTo(this.paddleX + this.paddleWidth / 2, this.margin + this.size)
        ctx.stroke()

        ctx.fillStyle = "blue"

        ctx.beginPath()
        ctx.arc(this.pongX, this.pongY, 5, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = "white"
        ctx.fillText(points, 0, 10);
    }
}
class EndScene extends Scene {
    update() {
        if (keysDown["a"]) {
            SceneManager.changeScene(0)
        }
    }
    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "red";
        ctx.fillText("You died", 100, 100);
    }
}

let startScene = new StartScene()
let mainScene = new MainScene()
let endScene = new EndScene()

SceneManager.addScene(startScene)
SceneManager.addScene(mainScene)
SceneManager.addScene(endScene)




