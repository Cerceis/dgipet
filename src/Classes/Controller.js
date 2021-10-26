import { GenerateObjectId } from "../lib/GenerateObjectId.js";
var ControllerClass = /** @class */ (function () {
    function ControllerClass() {
        this.ele = document.createElement('div');
        this.listOfChildElement = [];
        this.ele.style.display = "grid";
        this.ele.style.justifyItems = "center";
        this.ele.style.gridTemplateColumns = "1fr";
        this.ele.style.transition = "all .3s";
    }
    ControllerClass.prototype.bind = function (parent) {
        parent.appendChild(this.ele);
    };
    ControllerClass.prototype.setColCount = function (colCount) {
        this.ele.style.gridTemplateColumns = "repeat(" + colCount + ", 1fr)";
    };
    ControllerClass.prototype.add = function (childs, tags) {
        var _this = this;
        if (tags === void 0) { tags = []; }
        childs.forEach(function (child) {
            var childId = GenerateObjectId();
            _this.listOfChildElement.push({
                id: childId,
                tags: tags,
                ele: child,
            });
            _this.ele.appendChild(child);
        });
    };
    ControllerClass.prototype.delete = function (tags) {
        var _this = this;
        if (tags === void 0) { tags = null; }
        if (Array.isArray(tags)) {
            if (tags.length > 0) {
                this.listOfChildElement.forEach(function (child) {
                    var targeted = false;
                    tags.forEach(function (tag) {
                        targeted = child.tags.some(function (childTag) { return childTag === tag; });
                    });
                    if (targeted) {
                        _this.ele.removeChild(child.ele);
                    }
                });
            }
        }
        else {
            this.listOfChildElement.forEach(function (child) { return _this.ele.removeChild(child.ele); });
        }
    };
    return ControllerClass;
}());
export var Controller = new ControllerClass();
