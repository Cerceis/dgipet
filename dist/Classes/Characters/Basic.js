import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
var Basic = /** @class */ (function () {
    function Basic() {
        this.id = "";
        this.name = "";
        this.nickName = "";
        this.emotes = {
            "idle": ["000", "001"],
            "angry": ["008", "011"],
            "happy": ["003", "007"],
        };
        //Attributes
        this.attr_element = "None";
        this.attr_hunger_max = 1000;
        this.attr_hunger = 1000;
        this.attr_hungerRate = 1; //Fall off per seconds.
        this.attr_health_max = 100;
        this.attr_health = 100;
        this.attr_health_regen_rate = 5; //Regeneration per turn.
        this.attr_mana_max = 100;
        this.attr_mana = 100;
        this.attr_mana_regen_rate = 1;
        this.id = GenerateObjectId();
        this.initHunger();
    }
    Basic.prototype.load = function (data) {
        this.id = data.id;
        this.name = data.name;
        this.nickName = data.nickName;
        this.emotes = data.emotes;
        this.attr_element = data.attr_element;
        this.attr_hunger_max = data.attr_hunger_max;
        this.attr_hunger = data.attr_hunger;
        this.attr_hungerRate = data.attr_hungerRate;
        this.attr_health_max = data.attr_health_max;
        this.attr_health = data.attr_health;
        this.attr_health_regen_rate = data.attr_health_regen_rate;
        this.attr_mana_max = data.attr_mana_max;
        this.attr_mana = data.attr_mana;
        this.attr_mana_regen_rate = data.attr_mana_regen_rate;
    };
    Basic.prototype.initHunger = function () {
        var _this = this;
        this.interval_hunger = setInterval(function () {
            if (_this.attr_hunger - _this.attr_hungerRate < 0) {
                _this.attr_hunger = 0;
                clearInterval(_this.interval_hunger);
            }
            _this.attr_hunger -= _this.attr_hungerRate;
            //console.log(`${this.name}'s hunger: ${this.attr_hunger}/${this.attr_hunger_max}`);
        }, 1000);
    };
    Basic.prototype.eat = function () {
        console.log(this.name + " is eating...");
    };
    Basic.prototype.sleep = function () {
        console.log(this.name + " is sleeping...");
    };
    return Basic;
}());
export { Basic };
