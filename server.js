const util = require("./utils");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
const server = app.listen(port, util.log(`Server listening on port ${port}`));

const io = require("socket.io")(server);

let waitingClient = null; //the client socket id which is waiting for a person to versus

io.on("connection", (socket) => {
    util.log(`${socket.id} Online`);

    socket.on("disconnect", () => {
        if (socket.id == waitingClient) waitingClient = null;
        util.log(socket.id + " Offline");
    })

    //when called from the client when the puser presses find game button
    //pairs 2 sockets to the id of the one which calls this first
    socket.on("searchGame", () => {
        if (waitingClient == null) {
            waitingClient = socket.id;
            socket.join(socket.id);

            util.log("Client waiting for an opponent with id " + socket.id);
        } else {
            socket.join(waitingClient);

            util.log("Starting game with " + socket.id + " and " + waitingClient);

            io.to(waitingClient).emit("foundGame", waitingClient);
            waitingClient = null;
        }
    })
})

