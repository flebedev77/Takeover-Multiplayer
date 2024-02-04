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
        this.speed = 0.1;
        this.target = new Vector(-10, -10);

        this.arrowTarget = new Vector(-10, -10);
        this.movementArrowAngleOffset = Math.PI/4; //45 deg
        this.movementArrowLength = 10; //length of the triangle at the end of the line
    }

    draw(ctx = CTX) {
        if (this.icon) { //drawing the unit icon
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

        if (this.arrowTarget.x != -10 && mouse.down) { //if we have a target
            ctx.strokeStyle = "white";
            ctx.lineWidth = 3;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(this.position.x, this.position.y);
            ctx.lineTo(this.arrowTarget.x, this.arrowTarget.y);
            ctx.stroke();
            ctx.closePath();
            
            const dx = this.position.x - this.arrowTarget.x;
            const dy = this.position.y - this.arrowTarget.y;
            const angle = Math.atan2(dy, dx);

            //two ends at the end of the arrow
            ctx.beginPath()
            ctx.moveTo(this.arrowTarget.x, this.arrowTarget.y);
            ctx.lineTo(this.arrowTarget.x + Math.cos(angle + this.movementArrowAngleOffset) * this.movementArrowLength, this.arrowTarget.y + Math.sin(angle + this.movementArrowAngleOffset) * this.movementArrowLength);
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath()
            ctx.moveTo(this.arrowTarget.x, this.arrowTarget.y);
            ctx.lineTo(this.arrowTarget.x + Math.cos(angle - this.movementArrowAngleOffset) * this.movementArrowLength, this.arrowTarget.y + Math.sin(angle - this.movementArrowAngleOffset) * this.movementArrowLength);
            ctx.stroke();
            ctx.closePath();
        }
    }

    update() {
        if (this.target.x != -10) {
            const dirX = this.target.x - this.position.x;
            const dirY = this.target.y - this.position.y;
            const dirMag = Math.sqrt(dirX * dirX + dirY * dirY);

            //if we are far away move
            if (dirMag > this.speed + 1) {
                this.position.x += (dirX / dirMag) * this.speed * UTILS.time.deltaTime;
                this.position.y += (dirY / dirMag) * this.speed * UTILS.time.deltaTime;
            } else {
                //if close enough stop
                this.target.x = -10;
                this.target.y = -10;
            }
        }
    }
}