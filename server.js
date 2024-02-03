const util = require("./utils");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
const server = app.listen(port, util.log(`Server listening on port ${port}`));

const io = require("socket.io")(server);

let waitingClient = null; //the client socket id which is waiting for a person to versus

const serverMinPing = 500;

class Base {
    constructor(x, y, faction, id) {
        this.position = {
            x,
            y
        };
        this.faction = faction;
        this.health = 100; //100 by default
        this.id = id;
        this.units = [];
    }
}

class Unit {
    constructor(x, y, health, type) {
        this.position = {
            x,
            y
        };
        this.health = health;
        this.type = type;
    }
}

const bases = [];

const socketData = new Map();

io.on("connection", (socket) => {
    util.log(`${socket.id} Online`);

    socket.on("disconnect", () => {
        if (socketData.get(socket.id)) {
            //let the opponent know that we left
            const opp = socketData.get(socket.id).opponent;
            if (opp) {
                io.to(opp).emit("opponentLeft");
            }
            socketData.delete(socket.id);
        }
        if (socket.id == waitingClient) waitingClient = null;
        util.log(socket.id + " Offline");
    })

    //when called from the client when the puser presses find game button
    //pairs 2 sockets to the id of the one which calls this first
    socket.on("searchGame", (screen) => {
        //if no-one was waiting start waiting
        if (waitingClient == null) {
            //joining to a room with own id is unessesary because socketio does that by default
            waitingClient = socket.id;

            util.log("Client waiting for an opponent with id " + socket.id);
        } else {
            //if someone was waiting join them
            socket.join(waitingClient);

            util.log("Starting game with " + socket.id + " and " + waitingClient);

            //keep data on who is playing against who
            socketData.set(waitingClient, { opponent: socket.id });
            socketData.set(socket.id, { opponent: waitingClient });

            bases.push(new Base(Math.floor(Math.random() * screen.w), Math.floor(Math.random() * screen.h), util.PickRandomFaction(), socket.id));
            bases.push(new Base(Math.floor(Math.random() * screen.w), Math.floor(Math.random() * screen.h), util.PickRandomFaction(), waitingClient));

            io.to(waitingClient).emit("foundGame", waitingClient);
            waitingClient = null;
        }
    })

    //gameplay logic
    socket.on("createUnit", (data) => {
        //getting the base
        let base = bases.filter((base) => {
            if (base.id == socket.id) return true;
            return false
        });

        //checking if there is a base
        if (base.length > 0) {
            base = base[0];

            let unitType = "";

            //find the unit type by looping over all the keys of the type and checking if the values match
            Object.keys(util.UNITS.TYPE).forEach((value) => {
                if (util.UNITS.TYPE[value] == data.type) {
                    unitType = value;
                }
            })

            base.units.push(new Unit(data.position.x, data.position.y, util.UNITS.HEALTH[unitType], unitType))
        } else {
            util.log("Base not found");
        }
    })
})

setInterval(function () {
    io.sockets.sockets.forEach((socket, socketId) => {
        if (!socketData.get(socketId)) return;

        let room;
        socket.rooms.forEach((r) => {
            room = r;
        });
        socket.emit("heartbeat", bases.filter((base) => { //send only our base
            if (base.id == socketId) {
                return true;
            }
            return false;
        })[0],
            bases.filter((base) => {
                if (base.id == socketData.get(socketId).opponent) {
                    return true;
                }
                return false;
            })[0]
        )
    })
}, serverMinPing);