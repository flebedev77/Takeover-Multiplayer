class Archer extends Unit {
    constructor(x, y) {
        super(x, y, UTILS.image.UNITICONS.Archer)
        this.type = UTILS.UNITS.TYPE.Archer;
        this.health = UTILS.UNITS.HEALTH.Archer;
        this.maxHealth = this.health;
    }
}