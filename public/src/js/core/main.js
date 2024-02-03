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
    UTILS.network.drawPing(CTX);

    if (!yourBase || !otherBase) return;

    paths.forEach((path) => {
        path.draw(CTX);
    })

    yourBase.draw(CTX);
    CTX.fillStyle = "white";
    CTX.textAlign = "center";
    CTX.font = "bold 20px sans-serif";
    CTX.fillText("Your Base", yourBase.position.x + yourBase.width/2, yourBase.position.y + yourBase.height + 25);
    otherBase.draw(CTX);

    requestAnimationFrame(loop);
}


socket.on("heartbeat", (ourBase, other) => {
    //keep track of the ping
    UTILS.network.updatePing();

    if (ourBase == null || other == null) return;

    //sync positions
    yourBase.position = ourBase.position;
    otherBase.position = other.position;

    if (paths[0]) {
        paths[0].a.x = yourBase.position.x + yourBase.width/2;
        paths[0].a.y = yourBase.position.y + yourBase.height/2;
        paths[0].b.x = otherBase.position.x + otherBase.width/2;
        paths[0].b.y = otherBase.position.y + otherBase.height/2;
    }

    //sync factions for you
    if (yourBase.faction != ourBase.faction) { //if our base isin't what the server said change it
        //don't need if to check if the faction is grass because that is what the client default is
        if (ourBase.faction == UTILS.FACTIONS.Crimson) {
            yourBase = new Crimson(ourBase.position.x, ourBase.position.y, yourBase.width);
            yourBase.healthbarColor = UTILS.colors.factions.Crimson;
        } else if (ourBase.faction == UTILS.FACTIONS.Ice) {
            yourBase = new Ice(ourBase.position.x, ourBase.position.y, yourBase.width);
            yourBase.healthbarColor = UTILS.colors.factions.Ice;
        } else if (ourBase.faction == UTILS.FACTIONS.Undead) {
            yourBase = new Undead(ourBase.position.x, ourBase.position.y, yourBase.width);
            yourBase.healthbarColor = UTILS.colors.factions.Undead;
        }
    }

    //sync factions for enemy
    if (otherBase.faction != other.faction) { //if our base isin't what the server said change it
        //don't need if to check if the faction is grass because that is what the client default is
        if (other.faction == UTILS.FACTIONS.Grass) {
            otherBase = new Grass(other.position.x, other.position.y, otherBase.width);
            otherBase.healthbarColor = UTILS.colors.factions.Grass;
        } else if (other.faction == UTILS.FACTIONS.Ice) {
            otherBase = new Ice(other.position.x, other.position.y, otherBase.width);
            otherBase.healthbarColor = UTILS.colors.factions.Ice;
        } else if (other.faction == UTILS.FACTIONS.Undead) {
            otherBase = new Undead(other.position.x, other.position.y, otherBase.width);
            otherBase.healthbarColor = UTILS.colors.factions.Undead;
        }
    }
})

socket.on("opponentLeft", () => {
    alert("Your opponent left");
    window.location.reload(); //later replace with reinitialisiatrion (can't spell)
})

window.onclick = function(e) {
    //if mouse is over your base
    if (yourBase && UTILS.collision.AABB(e.x, e.y, 2, 2, yourBase.position.x, yourBase.position.y, yourBase.width, yourBase.height)) {
        createUnitOverlay.style.display = "flex";
        createUnitOverlay.style.top = yourBase.position.y + "px";
        createUnitOverlay.style.left = yourBase.position.x + "px";
    } else
        createUnitOverlay.style.display = "none";
}