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
        this.health = 100;
        this.maxHealth = this.health;
        this.healthbarColor = UTILS.colors.factions.Grass;
        this.healthbarMargin = 5;
    }
    draw(ctx) {
        //the base
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

        //the healthbar
        ctx.strokeStyle = "#000000";
        ctx.lineCap = "round";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y - this.healthbarMargin);
        ctx.lineTo(this.position.x + this.width, this.position.y - this.healthbarMargin);
        ctx.stroke();
        ctx.closePath();
        if (this.health > 0) {
            ctx.strokeStyle = this.healthbarColor;
            ctx.beginPath();
            ctx.moveTo(this.position.x, this.position.y - this.healthbarMargin);
            ctx.lineTo(this.position.x + (this.health / this.maxHealth) * this.width, this.position.y - this.healthbarMargin);
            ctx.stroke();
            ctx.closePath();
        }
    }
}

class Crimson extends Base {
    constructor(x, y, h) {
        super(x, y, h, UTILS.image.FACTIONS.Crimson, UTILS.FACTIONS.Crimson);
        this.healthbarColor = UTILS.colors.factions.Crimson;
    }
}

class Grass extends Base {
    constructor(x, y, h) {
        super(x, y, h, UTILS.image.FACTIONS.Grass, UTILS.FACTIONS.Grass);
        this.healthbarColor = UTILS.colors.factions.Grass;
    }
}

class Ice extends Base {
    constructor(x, y, h) {
        super(x, y, h, UTILS.image.FACTIONS.Ice, UTILS.FACTIONS.Ice);
        this.healthbarColor = UTILS.colors.factions.Ice;
    }
}

class Undead extends Base {
    constructor(x, y, h) {
        super(x, y, h, UTILS.image.FACTIONS.Undead, UTILS.FACTIONS.Undead);
        this.healthbarColor = UTILS.colors.factions.Undead;
    }
}