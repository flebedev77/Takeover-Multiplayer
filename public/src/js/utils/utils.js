function resizeCanvasToWindow() {
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(vec = new Vector(0, 0)) {
        return new Vector(this.x+vec.x, this.y+vec.y);
    }
    mag() {
        //pythagoras
        return Math.sqrt(-this.x * -this.x + -this.y * -this.y);
    }
    normalized() {
        return new Vector(this.x / this.mag(), this.y / this.mag());
    }
    dot(B = new Vector(0, 0)) {
        //a · b = ax × bx + ay × by
        let b = B.normalized(); //make sure the other vector is normalized
        return this.x * b.x + this.y * b.y;
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
                ctx.textAlign = "left";
                ctx.fillStyle = "white";
                ctx.font = "normal 15px sans-serif";
                ctx.fillText("FPS: " + this.framesPerSecond, 10, 30);
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
    },
    network: {
        prevPing: 0,
        ping: 0,
        updatePing: function() {
            //keep track of the last time this function was called then to get ping it is just currenttimestamp - prevfunctioncall
            let currentPing = Date.now();
            this.ping = currentPing - this.prevPing;
            this.prevPing = Date.now();
        },
        drawPing: function(ctx = null) {
            if (ctx) {
                ctx.textAlign = "left";
                ctx.fillStyle = "white";
                ctx.font = "normal 15px sans-serif";
                ctx.fillText("PING: " + this.ping, 10, 50);
            }
        }
    },
    colors: {
        factions: {
            Grass: "#68d601",
            Undead: "#9766f4",
            Crimson: "#f8ce1c",
            Ice: "#13f6f8"
        }
    },
    collision: {
        AABB: function(x1, y1, w1, h1, x2, y2, w2, h2) {
            if (
                x1 <= x2 + w2 &&
                x1 + w1 >= x2 &&
                y1 <= y2 + h2 &&
                y1 + h1 >= y2
            ) return true;
            return false;
        }
    }
}