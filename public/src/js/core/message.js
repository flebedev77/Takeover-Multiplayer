//displays a message to the user (styled alert) message is a string of the message and len is the length is is displayed
function displayMessage(message, len = 2000, callback = function() {}) {
    const container = document.querySelector(".message-overlay");

    const msgDiv = document.createElement("div");
    const p = document.createElement("p");
    p.innerText = message;

    const img = document.createElement("img");
    img.draggable = "false";
    img.src = window.origin + "/src/img/svg/close.svg";

    img.onclick = function() {
        this.parentElement.remove();
    }

    msgDiv.appendChild(p);
    msgDiv.appendChild(img);
    container.appendChild(msgDiv);

    setTimeout(function() {
        msgDiv.remove();
        callback();
    }, len);
}