var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Basic } from './Basic.js';
import { Animation } from '../Animation.js';
var Popomon = /** @class */ (function (_super) {
    __extends(Popomon, _super);
    function Popomon(size) {
        if (size === void 0) { size = 25; }
        var _this = _super.call(this) || this;
        _this.name = "Popomon";
        _this.animation = new Animation(size, _this.name, _this.emotes.idle);
        _this.ele = _this.animation.ele;
        return _this;
    }
    Popomon.prototype.make = function (emote) {
        if (this.emotes && this.emotes[emote]) {
            this.animation.setSprite(this.emotes[emote]);
        }
    };
    return Popomon;
}(Basic));
export { Popomon };
