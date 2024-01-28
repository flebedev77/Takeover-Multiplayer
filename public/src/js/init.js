const socket = io();

window.addEventListener("load", function() {
    resizeCanvasToWindow();
    CTX.fillStyle = "red";
    CTX.fillRect(100, 100, 1, 1);
});
window.addEventListener("resize", function() {
    resizeCanvasToWindow();
})