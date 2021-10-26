var Basic = /** @class */ (function () {
    function Basic() {
        this.name = "";
        this.nickName = "";
        this.emotes = {
            "idle": ["000", "001"],
            "angry": ["008", "011"],
            "happy": ["003", "007"],
        };
    }
    Basic.prototype.eat = function () {
        console.log(this.name + " is eating...");
    };
    Basic.prototype.sleep = function () {
        console.log(this.name + " is sleeping...");
    };
    return Basic;
}());
export { Basic };
