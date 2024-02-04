class Unit {
    constructor(x, y, icon = null, image = null) {
        //core
        this.position = {
            x,
            y
        };
        this.radius = 10;
        this.image = image;
        this.speed = 0.1; //walkspeed
        this.target = new Vector(-10, -10);
        this.type = UTILS.UNITS.TYPE.Guard;

        //icon
        this.icon = icon;
        this.iconOffset = new Vector(0, -30);
        this.iconScale = 50;
        this.iconPosition = new Vector(0, 0);

        //health
        this.health = 100;
        this.maxHealth = this.health;
        this.healthPadding = 3;
        
        //health smoothing
        this.smoothHealth = this.health;
        this.healthSmoothness = 5; //The amount the health is divided

        //arrow
        this.arrowTarget = new Vector(-10, -10);
        this.movementArrowAngleOffset = Math.PI/4; //45 deg
        this.movementArrowLength = 10; //length of the triangle at the end of the line

        //attacking
        this.damage = 10; //the damage the unit deals
        this.attackRate = 1000; //the delay of the unit attacking in ms
        this.attackDelay = this.attackRate;
        this.viewDistance = 10; //distance the unit sees the enemy and starts attacking

        this.attackDistance = 5; //distance at which unit can deal damage archers - far, guards - short
    }

    draw(ctx = CTX) {
        if (this.icon) { //drawing the unit icon
            this.iconPosition.x = (this.position.x + this.iconOffset.x) - this.iconScale / 2;
            this.iconPosition.y = (this.position.y + this.iconOffset.y) - this.iconScale;

            //update the healthbar
            this.smoothHealth += (this.health - this.smoothHealth) / this.healthSmoothness;
            this.smoothHealth = Math.min(this.smoothHealth, this.maxHealth); //clamp the smooth health
            this.smoothHealth = Math.max(this.smoothHealth, 0);

            //draw the healthbar
            ctx.fillStyle = UTILS.colors.healthBar;
            ctx.beginPath();
            let maxAngle = Math.PI*2;
            ctx.arc(this.iconPosition.x + this.iconScale/2, this.iconPosition.y + this.iconScale/2, this.iconScale/2 + this.healthPadding, Math.PI/2, (this.smoothHealth / this.maxHealth) * maxAngle + Math.PI/2);
            ctx.lineTo(this.iconPosition.x + this.iconScale/2, this.iconPosition.y + this.iconScale/2);
            ctx.fill();
            ctx.closePath();

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
            if (dirMag > (this.speed + 1) * UTILS.time.deltaTime) {
                this.position.x += (dirX / dirMag) * this.speed * UTILS.time.deltaTime;
                this.position.y += (dirY / dirMag) * this.speed * UTILS.time.deltaTime;
            } else {
                //if close enough stop
                this.target.x = -10;
                this.target.y = -10;
            }
        }

        otherUnits.forEach((unit, i) => {
            if (unit.health > 0) { //loop through all alive units
                this.attack(unit, i); //put in the unit to damage and its index in all the server/client arrays
            }
        })
    }

    attack(unit, i) {
        //using pythagoras to find the distance https://www.mathsisfun.com/pythagoras.html
        const dx = unit.position.x - this.position.x;
        const dy = unit.position.y - this.position.y;
        const dist = Math.sqrt(dx*dx + dy*dy);

        //can see unit
        if (this.viewDistance <= dist) {
            //console.log("Target seen");
            //if not close enough move to it
            if (dist > (this.attackDistance + this.speed + 1) * UTILS.time.deltaTime) {
                this.target = new Vector(unit.position.x, unit.position.y);
            } else if (dist <= (this.attackDistance + this.speed + 1) * UTILS.time.deltaTime) {
                console.log("Attacking " + i);
                //if close enough then stop and attack
                this.target = new Vector(-10, -10);

                this.attackDelay += UTILS.time.deltaTime;
                if (this.attackDelay >= this.attackRate) {
                    this.attackDelay = 0;
                    socket.emit("dealDamage", { type: this.type, unit: i })
                    unit.health -= this.damage;
                }
            }
        }
    }
}

//Vital data to be sent over the wire
class NetworkUnit {
    constructor(x, y, type, target, health) {
        this.position = {
            x,
            y
        };
        this.type = type;
        this.target = target;
        this.health = health;
    }
}