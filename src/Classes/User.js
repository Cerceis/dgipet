var UserClass = /** @class */ (function () {
    function UserClass() {
        this.id = "";
        this.name = "";
        this.partners = [];
    }
    Object.defineProperty(UserClass.prototype, "setName", {
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserClass.prototype, "getName", {
        get: function () { return this.name; },
        enumerable: false,
        configurable: true
    });
    return UserClass;
}());
export var User = new UserClass();
