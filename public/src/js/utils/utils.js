function resizeCanvasToWindow() {
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(vec) {
        return new Vector(this.x+vec.x, this.y+vec.y);
    }
}

const UTILS = {
    time: {
        prevFrameTime: Date.now(),
        currentFrameTime: Date.now(),
        framesPerSecond: 60,
        deltaTime: 0, //delta time in milliseconds

        //update and draw fps, if ctx is not specified will not draw
        updateFps: function (ctx = null) {
            this.currentFrameTime = Date.now();
            this.deltaTime = this.currentFrameTime - this.prevFrameTime;
            this.prevFrameTime = Date.now();
            this.framesPerSecond = Math.ceil(1000/this.deltaTime);
            

            if (ctx) {
                //drawing
                ctx.fillStyle = "white";
                ctx.font = "15px sans-serif normal";
                ctx.fillText("FPS: " + this.framesPerSecond, 10, 10);
            }
        }
    },
    image: {
        loadImage: function(src) {
            const i = new Image();
            i.src = src;
            return i;
        }
    }
}