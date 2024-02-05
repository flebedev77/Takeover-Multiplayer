const util = require("./utils");

module.exports = {
    spawnBases: function (w, h) {
        const positions = [];
        const firstPos = {
            x: 0,
            y: 0
        }
        const secondPos = {
            x: 0,
            y: 0
        }

        const padding = util.SPAWNING.basePadding;

        firstPos.x = padding + Math.random() * (w - padding * 2);
        firstPos.y = padding + Math.random() * (h - padding * 2);

        for (let i = 0; i < Math.PI * 2; i += 0.2) {
            const len = Math.min(w, h) + Math.random() * (Math.min(w, h) / 2);
            secondPos.x = Math.cos(i) * len;
            secondPos.y = Math.sin(i) * len;

            if (
                secondPos.x > padding &&
                secondPos.x < w - padding &&
                secondPos.y > padding &&
                secondPos.y < h - padding
            ) {
                break;
            }
        } 

        positions.push(firstPos, secondPos);
        return positions;
    }
}