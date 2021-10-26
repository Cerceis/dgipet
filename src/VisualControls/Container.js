var ControlContainer = /** @class */ (function () {
    function ControlContainer(childs, style) {
        var _this = this;
        if (childs === void 0) { childs = []; }
        if (style === void 0) { style = ""; }
        this.ele = document.createElement("div");
        this.ele.setAttribute("style", "display:grid;" + style);
        childs.forEach(function (child) {
            _this.ele.appendChild(child);
        });
    }
    ControlContainer.prototype.add = function (childs) {
        var _this = this;
        childs.forEach(function (child) {
            _this.ele.appendChild(child);
        });
    };
    return ControlContainer;
}());
export { ControlContainer };
