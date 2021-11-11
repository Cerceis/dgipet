var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GenerateObjectId } from "../../lib/GenerateObjectId.js";
import { LevelParser } from "../GameEngine/LevelParser.js";
export class Basic {
    constructor() {
        this.id = "";
        this.name = "";
        this.nickName = "";
        this.emotes = {
            "idle": ["000", "001"],
            "angry": ["008", "011"],
            "happy": ["003", "007"],
        };
        this.experience = 0;
        this.levelInfo = LevelParser(this.experience);
        this.statusEffects = [];
        this.skills = []; //changed type to any because it's either SkillName or Skill
        //Attributes
        this.attr_element = "None";
        this.attr_hunger_max = 1000;
        this.attr_hunger = 1000;
        this.attr_hungerRate = 1; //Fall off per seconds.
        //Hit chance = (selfAccuracy+selfSpeed - enemySpeed) as percentage + 50%.
        //Stats
        /*
            Strength
            - +Physical damage
            - +minor max HP
            - +minor physical defense
            - +minor HP regen
            - +minor hunger rate
        */
        this.attr_str = 4;
        /*
            Intelligence
            - +Skill damage
            - +minor max Mana
            - +minor skill defense
            - +minor Mana regen
            - +minor hunger rate
        */
        this.attr_int = 4;
        /*
            Dexterity
            - +Accuracy
            - +Minor physical damage
            - +Minor skill damage
        */
        this.attr_dex = 4;
        /*
            Concentration
            - +HP regen
            - +MP regen
            - +Speed
        */
        this.attr_con = 4;
        /*
            Vitality
            - +Max HP
            - +Max MP
            - +minor physical defense
            - +minor skill defense
        */
        this.attr_vit = 4;
        //Stats increase per level
        this.str_per_level = 1;
        this.int_per_level = 1;
        this.dex_per_level = 1;
        this.con_per_level = 1;
        this.vit_per_level = 1;
        //These attributes are define after calculation, no load needed
        this.attr_health_max = 0;
        this.attr_health = 0;
        this.attr_health_regen_rate = 0; //Regeneration per turn.
        this.attr_mana_max = 0;
        this.attr_mana = 0;
        this.attr_mana_regen_rate = 0;
        this.attr_speed = 0;
        this.attr_accuracy = 0;
        this.attr_physical_damage = 1;
        this.attr_skill_damage = 1;
        this.attr_physical_defense = 1;
        this.attr_skill_defense = 1;
        this.id = GenerateObjectId();
        this.initHunger();
    }
    load(data) {
        this.id = data.id;
        this.name = data.name;
        this.nickName = data.nickName;
        this.emotes = data.emotes;
        this.attr_element = data.attr_element;
        this.attr_hunger_max = data.attr_hunger_max;
        this.attr_hunger = data.attr_hunger;
        this.attr_hungerRate = data.attr_hungerRate;
        this.attr_str = data.attr_str;
        this.attr_int = data.attr_int;
        this.attr_dex = data.attr_dex;
        this.attr_con = data.attr_con;
        this.str_per_level = data._str_per_level;
        this.int_per_level = data._int_per_level;
        this.dex_per_level = data._dex_per_level;
        this.con_per_level = data._con_per_level;
        this.vit_per_level = data._vit_per_level;
    }
    initHunger() {
        this.interval_hunger = setInterval(() => {
            if (this.attr_hunger - this.attr_hungerRate < 0) {
                this.attr_hunger = 0;
                clearInterval(this.interval_hunger);
            }
            this.attr_hunger -= this.attr_hungerRate;
            //console.log(`${this.name}'s hunger: ${this.attr_hunger}/${this.attr_hunger_max}`);
        }, 1000);
    }
    initSkills() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.skills.length; i++) {
                this.skills[i] = new (yield import(`../Skills/${this.skills[i]}.js`))[this.skills[i]](this);
            }
        });
    }
    calculateLevel() {
        this.levelInfo = LevelParser(this.experience);
        const currentLevel = this.levelInfo.level;
        this.attr_str += currentLevel * this.str_per_level;
        this.attr_int += currentLevel * this.int_per_level;
        this.attr_dex += currentLevel * this.dex_per_level;
        this.attr_con += currentLevel * this.con_per_level;
        this.attr_vit += currentLevel * this.vit_per_level;
    }
    calculateAttribute() {
        this.attr_health_max = 100 + this.attr_vit * 10 + this.attr_str * 2;
        this.attr_health_regen_rate = 1 + Number(Math.exp(((0.1 * (this.attr_con * 0.5 + this.attr_str * 0.2)) / 2)).toFixed(3));
        this.attr_mana_max = 100 + this.attr_vit * 10 + this.attr_int * 2;
        this.attr_mana_regen_rate = 1 + Number(Math.exp(((0.1 * (this.attr_con * 0.5 + this.attr_int * 0.2)) / 2)).toFixed(3));
        //Dev
        this.attr_accuracy = 50 + Number(Math.exp(this.attr_dex / 3).toFixed(3));
        this.attr_speed = 50 + Number(Math.exp(this.attr_con / 3).toFixed(3));
        this.attr_physical_damage = 10 + this.attr_str * 2.5;
        this.attr_skill_damage = 10 + this.attr_int * 2.5;
        this.attr_physical_defense = 5 + this.attr_vit + this.attr_str * 0.1;
        this.attr_skill_defense = 5 + this.attr_vit + this.attr_int * 0.1;
    }
    addExp(exp) {
        const previousLevel = this.levelInfo.level;
        this.experience += exp;
        this.calculateLevel();
        this.calculateAttribute();
        //Restore hp/mana to max when leveled.
        if (this.levelInfo.level > previousLevel)
            this.attr_health = this.attr_health_max;
        this.attr_mana = this.attr_mana_max;
    }
    addStatusEffect(statusEffectName) {
        return __awaiter(this, void 0, void 0, function* () {
            //activationTick is the life of the status per statusEffectsNextTick() call.
            const statusEffect = new (yield import(`../StatusEffects/${statusEffectName}.js`))[statusEffectName](this);
            //Check if the effect is stackable or extendable
            const hasSameStatusEffectCount = this.statusEffects.filter(se => se.status.name === statusEffect.name).length;
            if (hasSameStatusEffectCount) {
                if (statusEffect.effectStackable && hasSameStatusEffectCount < statusEffect.maxStack) {
                    this.statusEffects.push({
                        trackerId: statusEffect.trackerId,
                        status: statusEffect,
                    });
                    statusEffect.activate();
                }
            }
            else {
                this.statusEffects.push({
                    trackerId: statusEffect.trackerId,
                    status: statusEffect,
                });
                statusEffect.activate();
            }
            return statusEffect;
        });
    }
    removeStatusEffects(statusEffet) {
        const id = statusEffet.trackerId;
        const expiredIndex = this.statusEffects.findIndex(status => status.trackerId === id);
        this.statusEffects.splice(expiredIndex, 1);
    }
    sleep() {
        console.log(`${this.name} is sleeping...`);
    }
    make(emote) {
        if (this.emotes && this.emotes[emote]) {
            this.animation.setSprite(this.emotes[emote]);
        }
    }
}
