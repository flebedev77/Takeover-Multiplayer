class Base {
    constructor(x, y, scale, img) {
        this.position = {
            x,
            y
        };
        this.aspectRatio = img.width / img.height;
        this.width = scale * this.aspectRatio;
        this.height = scale;
        this.image = img;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

class Crimson extends Base {
    constructor(x, y, h) {
        super(x, y, h, UTILS.image.loadImage(window.origin + "/src/img/Crimson.png"));
    }
}

class Grass extends Base {
    constructor(x, y, h) {
        super(x, y, h, UTILS.image.loadImage(window.origin + "/src/img/Grass.png"));
    }
}