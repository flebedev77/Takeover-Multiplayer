class Archer extends Unit {
    constructor(x, y, enemy = false) {
        super(x, y, UTILS.image.UNITICONS.Archer, null, enemy);
        this.type = UTILS.UNITS.TYPE.Archer;
        this.health = UTILS.UNITS.HEALTH.Archer;
        this.maxHealth = this.health;
        this.attackDistance = UTILS.UNITS.RANGE.Archer;
    }
}