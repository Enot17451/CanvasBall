let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let g = 0.3

class Ball{
    x
    y
    vx=10
    vy=0
    radius=50
    color

    constructor(x,y){
        this.color = "blue"
        this.x = x
        this.y = y
    }

    paint(){
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,6.26)
        ctx.fill()
        ctx.closePath()
    }

    hitGround(){
        return this.y+this.radius >= canvas.height
    }

    hitWall(){
        return this.x+this.radius >= canvas.width
        || this.x-this.radius <= 0
    }

    update(){
        this.vy += g
        this.y += this.vy
        this.x += this.vx
        if(this.hitGround()){
            this.y = canvas.height-this.radius
            this.vy *= -0.8
        }
        if(this.hitWall()){
            this.vx *=-0.9
        }
    }
}

let b = new Ball(500,100)
b.paint()

function frame(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    update()
    repaint()
    requestAnimationFrame(frame)
}

function update(){
    b.update()
}

function repaint(){
    b.paint()
}

requestAnimationFrame(frame)