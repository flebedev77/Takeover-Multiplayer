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
    CTX.fillStyle = "white";
    CTX.textAlign = "center";
    CTX.font = "bold 25px serif";
    CTX.fillText("Your Base", yourBase.position.x + yourBase.width/2, yourBase.position.y);
    otherBase.draw(CTX);

    requestAnimationFrame(loop);
}


socket.on("heartbeat", (ourBase, other) => {
    // console.log(ourBase);
    //console.log(otherBase);
    if (ourBase == null || other == null) return;

    yourBase.position = ourBase.position;
    otherBase.position = other.position;

    if (yourBase.faction != ourBase.faction) { //if our base isin't what the server said change it
        //don't need if to check if the faction is grass because that is what the client default is
        if (ourBase.faction == UTILS.FACTIONS.Crimson)
            yourBase = new Crimson(ourBase.position.x, ourBase.position.y, yourBase.width);
        else if (ourBase.faction == UTILS.FACTIONS.Ice)
            yourBase = new Ice(ourBase.position.x, ourBase.position.y, yourBase.width);
        else if (ourBase.faction == UTILS.FACTIONS.Undead)
            yourBase = new Undead(ourBase.position.x, ourBase.position.y, yourBase.width);
    }

    if (otherBase.faction != other.faction) { //if our base isin't what the server said change it
        //don't need if to check if the faction is grass because that is what the client default is
        if (other.faction == UTILS.FACTIONS.Grass)
            otherBase = new Grass(other.position.x, other.position.y, otherBase.width);
        else if (other.faction == UTILS.FACTIONS.Ice)
            otherBase = new Ice(other.position.x, other.position.y, otherBase.width);
        else if (other.faction == UTILS.FACTIONS.Undead)
            otherBase = new Undead(other.position.x, other.position.y, otherBase.width);
    }
})