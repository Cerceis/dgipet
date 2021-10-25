var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { GenerateObjectId } from "../lib/GenerateObjectId.js";
/****************************************Types and Interfaces***************************************/
var transitionSpeed = ".3s";
var ScreenClass = /** @class */ (function () {
    function ScreenClass() {
        this.ele = document.createElement('div');
        this.listOfChildElement = [];
        var eleStyle = "\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tposition:absolute;\n\t\t\tborder: 1px dashed #747474;\n\t\t\tborder-radius: .5em;\n\t\t";
        this.ele.setAttribute("style", eleStyle);
    }
    ScreenClass.prototype.bind = function (parent) {
        parent.appendChild(this.ele);
    };
    ScreenClass.prototype.draw = function (child, x, y, tags) {
        if (tags === void 0) { tags = []; }
        //x, y as percentage
        var childId = GenerateObjectId();
        child.setAttribute("id", childId);
        child.style.position = "absolute";
        child.style.transition = "transform " + transitionSpeed + ", top " + transitionSpeed + ", left " + transitionSpeed;
        child.style.top = y + "%";
        child.style.left = x + "%";
        child.style.transform = "translate(" + -x + "%, " + -y + "%)";
        this.listOfChildElement.push({
            id: childId,
            tags: tags,
            ele: child,
        });
        this.ele.appendChild(child);
    };
    ScreenClass.prototype.delete = function (tags) {
        var _this = this;
        if (tags === void 0) { tags = null; }
        if (!tags)
            this.ele.innerHTML = "";
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
    };
    ScreenClass.prototype.move = function (tags, x, y) {
        var targetedChilds = this.listOfChildElement.filter(function (child) {
            return tags.some(function (tag) { return child.tags.includes(tag); });
        });
        targetedChilds.forEach(function (child) {
            child.ele.style.top = y + "%";
            child.ele.style.left = x + "%";
            child.ele.style.transform = "translate(" + -x + "%, " + -y + "%)";
        });
    };
    ScreenClass.prototype.delay = function (ms) {
        return new Promise(function (resolve) {
            setTimeout(resolve, ms);
        });
    };
    ScreenClass.prototype.pipe = function (pipelineActions) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _i, pipelineActions_1, pipe, action, params, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _i = 0, pipelineActions_1 = pipelineActions;
                        _c.label = 1;
                    case 1:
                        if (!(_i < pipelineActions_1.length)) return [3 /*break*/, 9];
                        pipe = pipelineActions_1[_i];
                        action = Object.keys(pipe)[0];
                        params = pipe[Object.keys(pipe)[0]];
                        _b = action;
                        switch (_b) {
                            case "draw": return [3 /*break*/, 2];
                            case "move": return [3 /*break*/, 4];
                            case "delay": return [3 /*break*/, 6];
                        }
                        return [3 /*break*/, 8];
                    case 2:
                        this[action](params.child, params.x, params.y, (_a = params.tags) !== null && _a !== void 0 ? _a : []);
                        return [4 /*yield*/, this.delay(300)];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 8];
                    case 4:
                        this.move(params.tags, params.x, params.y);
                        return [4 /*yield*/, this.delay(300)];
                    case 5:
                        _c.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this[action](params.ms)];
                    case 7:
                        _c.sent();
                        return [3 /*break*/, 8];
                    case 8:
                        _i++;
                        return [3 /*break*/, 1];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return ScreenClass;
}());
export var Screen = new ScreenClass();
/*
    await Screen.pipe([
        {
            move: { tags: ["startBtn"], x:20, y:30 },
        },
        {
            move: { tags: ["testBtn"], x:50, y:77 },
        },
    ])
*/ 
