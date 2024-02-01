const CANVAS = document.querySelector("#canvas");
const CTX = canvas.getContext("2d");

const exitBtn = document.getElementById("exitBtn");
const startBtn = document.getElementById("startBtn");

const centerOverlay = document.querySelector(".center-overlay");

//first child should be the title
const centerOverlayTitle = centerOverlay.children[0];

//initialize the search game function so that initjs can call and mainjs define
let searchGame = function() {
};

//The host room id (Used by the server)
let roomId = "";

//initialize the base the current client owns
let yourBase = null;
let otherBase = null;

let NetworkPing = 100;
let NetworkInterval = null;

//paths
let paths = [];