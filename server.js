const util = require("./utils");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
const server = app.listen(port, util.log(`Server listening on port ${port}`));

const io = require("socket.io")(server);

io.on("connection", (socket) => {
    util.log(`${socket.id} Online`);

    socket.on("disconnect", () => {
        util.log(socket.id + " Offline");
    })
})

