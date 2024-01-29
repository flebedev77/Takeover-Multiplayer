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