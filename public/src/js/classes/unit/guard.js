class Guard extends Unit {
    constructor(x, y) {
        super(x, y, UTILS.image.UNITICONS.Guard);
        this.type = UTILS.UNITS.TYPE.Guard;
        this.health = UTILS.UNITS.HEALTH.Guard;
        this.maxHealth = this.health;
    }
}