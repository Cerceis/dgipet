export class HealthOperator {
    constructor(character) {
        this.character = character;
    }
    add(value, percentage = false) {
        this.character.attr_health += percentage ? this.character.attr_health * value / 100 : value;
    }
    toMax() {
        this.character.attr_health = this.character.attr_health_max;
    }
}
