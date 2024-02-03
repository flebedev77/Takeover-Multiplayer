class Unit {
    constructor(x, y, icon = null, image = null) {
        this.position = {
            x,
            y
        };
        this.radius = 10;
        this.image = image;
        this.icon = icon;
        this.iconOffset = new Vector(0, -30);
        this.iconScale = 50;
        this.iconPosition = new Vector(0, 0);
        this.speed = 2;
        this.target = new Vector(-10, -10);
    }

    draw(ctx = CTX) {
        if (this.icon) {
            this.iconPosition.x = (this.position.x + this.iconOffset.x) - this.iconScale / 2;
            this.iconPosition.y = (this.position.y + this.iconOffset.y) - this.iconScale;
            ctx.drawImage(this.icon, this.iconPosition.x, this.iconPosition.y, this.iconScale, this.iconScale);
        }
        if (this.image == null) { //if no image draw debug
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        } else {
        }
    }

    update() {
        if (this.target.x != -10) {
            const dirX = this.target.x - this.position.x;
            const dirY = this.target.y - this.position.y;
            const dirMag = Math.sqrt(dirX * dirX + dirY * dirY);

            //if we are far away move
            if (dirMag > 3) {
                this.position.x += (dirX / dirMag) * this.speed;
                this.position.y += (dirY / dirMag) * this.speed;
            } else {
                //if close enough stop
                this.target.x = -10;
                this.target.y = -10;
            }
        }
    }
}