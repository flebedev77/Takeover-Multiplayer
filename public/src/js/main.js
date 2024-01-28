
function loop() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    UTILS.time.updateFps(CTX);

    requestAnimationFrame(loop);
}

window.addEventListener("load", function() {
    init();
    loop();
})