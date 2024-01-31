const socket = io();

window.addEventListener("load", function() {
    centerOverlay.style.display = "none";

    //resize the canvas
    resizeCanvasToWindow();
});
window.addEventListener("resize", function() {
    resizeCanvasToWindow();
});

exitBtn.addEventListener("click", function() {
    //if you only find this now - Should have read the fucking source code
    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
})
startBtn.addEventListener("click", function() {
    startBtn.parentElement.parentElement.style.display = "none";
    searchGame();
})

function init() {
    //x, y, ysize, image - width is handled with the aspect ratio
    yourBase = new Grass(0, 0, 50);
    otherBase = new Crimson(0, 0, 50);
}