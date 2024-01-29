searchGame = function () {
    centerOverlay.style.display = "";

    centerOverlayTitle.innerText = "Looking for a game";

    socket.emit("searchGame");

    socket.on("foundGame", (id) => {
        centerOverlay.style.display = "none";
        roomId = id;
    })

}


function loop() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    UTILS.time.updateFps(CTX);

    requestAnimationFrame(loop);
}

window.addEventListener("load", function () {
    init();
    loop();
})