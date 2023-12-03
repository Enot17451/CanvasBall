let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
let dt = 0
let time1 = new Date().getTime()

let g = 0.1

class Ball{
    x
    y
    vx=3
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
        if(this.hitGround()){
            this.y = canvas.height-this.radius
            this.vy *= -0.8
        }
        if(this.hitWall()){
            this.vx *=-0.9
        }
        this.y += this.vy*dt
        this.x += this.vx*dt
    }
}

class Render{
    objects = []
    time1
    time2
    dt

    constructor(){
        requestAnimationFrame(()=>{
            this.time1 = new Date().getTime()
            this.frame()
        })
    }

    frame(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        this.time2 = new Date().getTime()
        this.dt = (this.time2-this.time1)
        this.time1=this.time2
        console.log(this.dt);
        this.update()
        this.paint()
        requestAnimationFrame(()=>this.frame())
    }

    add(object){
        this.objects.push(object)
    }

    update(){
        for (const o of this.objects) {
            o.update()
        }
    }

    paint(){
        for (const o of this.objects) {
            o.paint()
        }
    }
}


let render  = new Render()



