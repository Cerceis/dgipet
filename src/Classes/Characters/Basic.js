var Basic = /** @class */ (function () {
    function Basic() {
        this.name = "";
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
