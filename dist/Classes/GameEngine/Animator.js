var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var AnimatorClass = /** @class */ (function () {
    function AnimatorClass(tick) {
        this._globalInterval = 0;
        this._resources = [];
        this._tick = 0;
        this._tick = tick;
    }
    AnimatorClass.prototype.updateTick = function (method, tick) {
        switch (method) {
            case "to":
                this._tick = tick;
                break;
            case "add":
                this._tick += tick;
                break;
            case "minus":
                this._tick -= tick;
                break;
        }
    };
    AnimatorClass.prototype.addResources = function (res) {
        if (Array.isArray(res))
            this._resources = __spreadArray(__spreadArray([], this._resources, true), res, true);
        else
            this._resources.push(res);
    };
    AnimatorClass.prototype.start = function () {
        var _this = this;
        clearInterval(this._globalInterval);
        this._globalInterval = setInterval(function () {
            _this._resources.forEach(function (ani) {
                ani.next();
            });
        }, this._tick);
    };
    return AnimatorClass;
}());
export var Animator = new AnimatorClass(300);
