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

function loadImage(src) {
    const i = new Image();
    i.src = src;
    return i;
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
                ctx.font = "normal 15px sans-serif";
                ctx.fillText("FPS: " + this.framesPerSecond, 50, 30);
            }
        }
    },
    image: {
        loadImage: function(src) {
            const i = new Image();
            i.src = src;
            return i;
        },
        FACTIONS: {
            Crimson: loadImage(window.origin + "/src/img/png/Crimson.png"),
            Grass: loadImage(window.origin + "/src/img/png/Grass.png"),
            Ice: loadImage(window.origin + "/src/img/png/Ice.png"),
            Undead: loadImage(window.origin + "/src/img/png/Undead.png")
        }
    },
    FACTIONS: {
        Grass: 1,
        Crimson: 2,
        Ice: 3,
        Undead: 4
    }
}