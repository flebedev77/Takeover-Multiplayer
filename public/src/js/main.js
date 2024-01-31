searchGame = function () {
    centerOverlay.style.display = "";

    centerOverlayTitle.innerText = "Looking for a game";

    socket.emit("searchGame", { w: window.innerWidth, h: window.innerHeight });

    socket.on("foundGame", (id) => {
        centerOverlay.style.display = "none";
        roomId = id;

        init();
        loop();
    })

}


function loop() {
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);

    UTILS.time.updateFps(CTX);

    if (!yourBase || !otherBase) return;

    yourBase.draw(CTX);
    otherBase.draw(CTX);

    requestAnimationFrame(loop);
}


socket.on("heartbeat", (ourBase, other) => {
    // console.log(ourBase);
    //console.log(otherBase);
    if (ourBase == null || other == null) return;

    yourBase.position = ourBase.position;
    otherBase.position = other.position;
})