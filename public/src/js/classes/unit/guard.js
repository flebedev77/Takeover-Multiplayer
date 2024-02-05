class Guard extends Unit {
    constructor(x, y, enemy = false) {
        super(x, y, UTILS.image.UNITICONS.Guard, null, enemy);
        this.type = UTILS.UNITS.TYPE.Guard;
        this.health = UTILS.UNITS.HEALTH.Guard;
        this.maxHealth = this.health;
    }
}