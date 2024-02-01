class Base {
    constructor(x, y, scale, img, faction) {
        this.position = {
            x,
            y
        };
        this.aspectRatio = img.height / img.width;
        this.width = scale// * this.aspectRatio;
        this.height = scale * this.aspectRatio;
        this.image = img;
        this.faction = faction;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

class Crimson extends Base {
    constructor(x, y, h) {
        super(x, y, h, UTILS.image.FACTIONS.Crimson, UTILS.FACTIONS.Crimson);
    }
}

class Grass extends Base {
    constructor(x, y, h) {
        super(x, y, h, UTILS.image.FACTIONS.Grass, UTILS.FACTIONS.Grass);
    }
}

class Ice extends Base {
    constructor(x, y, h) {
        super(x, y, h, UTILS.image.FACTIONS.Ice, UTILS.FACTIONS.Ice);
    }
}

class Undead extends Base {
    constructor(x, y, h) {
        super(x, y, h, UTILS.image.FACTIONS.Undead, UTILS.FACTIONS.Undead);
    }
}