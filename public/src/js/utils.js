function resizeCanvasToWindow() {
    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;
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
    }
}