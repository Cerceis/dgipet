import { Basic } from './Basic.js';
import { Animation } from '../GameEngine/Animation.js';
export class Nyaromon extends Basic {
    constructor(size = 25) {
        super();
        this.name = "Nyaromon";
        this.tier = 0;
        this.nickName = this.name;
        //Init animations
        this.animation = new Animation(size, this.name, this.emotes.idle, this.id);
        this.ele = this.animation.ele;
        //Stats
        this.attr_str += 1;
        this.attr_int += 0;
        this.attr_dex += 1;
        this.attr_vit += 2;
        this.attr_con += 2;
        //Base Stats increament per level // default: 1 per level
        this.str_per_level += 0;
        this.int_per_level += 0;
        this.dex_per_level += 0;
        this.vit_per_level += 0;
        this.con_per_level += 0;
        this.calculateLevel();
        this.calculateAttribute();
        this.attr_health = this.attr_health_max;
        this.attr_mana = this.attr_mana_max;
        this.skills = [
            "Tackle",
            "Rage", "PoisonFang"
        ];
        this.initSkills();
    }
}
