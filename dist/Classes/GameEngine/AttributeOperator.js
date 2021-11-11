const attributeMap = {
    "hp": "attr_health",
    "maxHp": "attr_health_max",
    "mp": "attr_mana",
    "maxMp": "attr_mana_max",
    "hpRegen": "attr_health_regen_rate",
    "mpRegen": "attr_mana_regen_rate",
    "speed": "attr_speed",
    "accuracy": "attr_accuracy",
    "phyDmg": "attr_physical_damage",
    "skiDmg": "attr_skill_damage",
    "phyDef": "attr_physical_defense",
    "skillDef": "attr_skill_defense",
    "str": "attr_str",
    "int": "attr_int",
    "dex": "attr_dex",
    "con": "attr_con",
    "vit": "attr_vit",
    "hunger": "attr_hunger",
    "hungerRate": "attr_hungerRate",
    "hungerMax": "attr_hunger_max",
};
const attributeRules = {
    "hp": { min: 0 },
    "maxHp": { min: 0 },
    "mp": { min: 0 },
    "maxMp": { min: 0 },
    "hpRegen": { min: 0 },
    "mpRegen": { min: 0 },
    "speed": { min: 0 },
    "accuracy": { min: 0 },
    "phyDmg": { min: 0 },
    "skiDmg": { min: 0 },
    "phyDef": { min: 0 },
    "skillDef": { min: 0 },
    "str": { min: 0 },
    "int": { min: 0 },
    "dex": { min: 0 },
    "con": { min: 0 },
    "vit": { min: 0 },
    "hunger": { min: 0 },
    "hungerRate": { min: 0 },
    "hungerMax": { min: 0 }
};
export const AttributeOperator = {
    set(char) {
        this.char = char;
        return this;
    },
    _(attr, operation) {
        attr.forEach(a => {
            const operationArr = operation.split("");
            const operator = operationArr[0];
            const isPercentage = operationArr[operationArr.length - 1] === "%" ? true : false;
            let valueBody, result;
            if (isPercentage)
                valueBody = Number(operationArr.slice(1, operationArr.length - 1).join(""));
            else
                valueBody = Number(operationArr.slice(1, operationArr.length).join(""));
            if (operator !== "+" && operator !== "-" && operator !== "*" && operator !== "/")
                throw "No operator specified or, not valid operator";
            if (isPercentage)
                result = eval(`${this.char[attributeMap[a]]} ${operator} ${this.char[attributeMap[a]]} * ${valueBody}/100`);
            else
                result = eval(`${this.char[attributeMap[a]]} ${operator} ${valueBody}`);
            //Check rules
            if (result < attributeRules[a].min)
                result = attributeRules[a].min;
            //Some attributerelations
            //When health is > maxHealh | with mp
            if (a === "hp" && result > this.char.attr_health_max)
                result = this.char.attr_health_max;
            if (a === "mp" && result > this.char.attr_mana_max)
                result = this.char.attr_mana_max;
            if (a === "hunger" && result > this.char.attr_hunger_max)
                result = this.char.attr_hunger_max;
            this.char[attributeMap[a]] = result;
        });
    }
};
