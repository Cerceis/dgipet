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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
//Static Class
var Dialog = /** @class */ (function () {
    function Dialog() {
        Dialog.ele.style.transition = "all .3s";
        Dialog.ele.style.width = "100%";
        Dialog.ele.style.height = "100%";
        Dialog.ele.style.zIndex = "2";
        //Add a layer so player won't be able to select text;
        Dialog.ele_autoPlay.textContent = "Auto";
        Dialog.ele_autoPlay.setAttribute("style", "\n\t\t\tposition:absolute;\n\t\t\ttop:-20px; right:0;\n\t\t");
        Dialog.ele.appendChild(Dialog.ele_autoPlay);
        //
        var ele_textStyle = "\n\t\t\tposition:absolute; height:100%; \n\t\t\tpadding:1.5em; border-radius:.5em;\n\t\t\twidth:100%; background:rgba(77,77,77,.7); \n\t\t\tbox-sizing:border-box; overflow-y:scroll;\n\t\t\tfont-size: min(24px, 1.5vw);\n\t\t";
        Dialog.ele_text.setAttribute("style", ele_textStyle);
        Dialog.ele.appendChild(Dialog.ele_text);
        //Insert dialog cursor
        var ele_dialogCursorStyle = "position:absolute; bottom:-1.5em; right:0;";
        Dialog.ele_dialogCursor.setAttribute("style", ele_dialogCursorStyle);
        Dialog.ele_dialogCursor.src = "../../assets/visuals/dialogCursor.gif";
        Dialog.ele.appendChild(Dialog.ele_dialogCursor);
        //Create sound effect;
        Dialog.ele_sound.src = "../../assets/sound-effects/generals/dialog.wav";
        Dialog.ele_sound.setAttribute("preload", "auto");
        Dialog.ele_sound.setAttribute("controls", "none");
        Dialog.ele_sound.setAttribute("loop", "true");
        Dialog.ele_sound.style.display = "none";
        document.body.appendChild(Dialog.ele_sound);
        //Set click events
        this.initEvents();
    }
    Dialog.setDialog = function (dialogs, autoStart) {
        if (autoStart === void 0) { autoStart = true; }
        this.currentDialog = 0;
        this.dialogs = dialogs;
        this.dialogEnded = false;
        if (autoStart)
            Dialog.render();
    };
    Dialog.clear = function () {
        this.currentDialog = 0;
        this.dialogs = [];
        this.dialogEnded = false;
        this.ele_text.textContent = "";
    };
    Dialog.delay = function (tick) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, tick);
        });
    };
    Dialog.prototype.initEvents = function () {
        Dialog.ele_text.onclick = this.next;
        Dialog.ele_autoPlay.onclick = function () {
            Dialog.autoPlay = !Dialog.autoPlay;
            if (Dialog.autoPlay && !Dialog.rendering)
                _dialog.next();
            else if (Dialog.autoPlay && Dialog.rendering)
                Dialog.breakDialog = true;
            if (Dialog.autoPlay)
                Dialog.ele_autoPlay.style.boxShadow = "0 0 5px inset blue";
            else
                Dialog.ele_autoPlay.style.boxShadow = "";
        };
    };
    Dialog.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            var targetDialog, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.toggleCursor(true);
                        this.ele_text.textContent = "";
                        targetDialog = this.dialogs[this.currentDialog];
                        targetDialog = Dialog.parser(targetDialog);
                        this.rendering = true;
                        this.ele_sound.play();
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < targetDialog.length)) return [3 /*break*/, 4];
                        if (this.renderEventList[i] && this.renderEventList[i].value)
                            this.renderEventList[i].value();
                        this.ele_text.textContent += targetDialog[i];
                        return [4 /*yield*/, this.delay(this._renderSpeed)];
                    case 2:
                        _a.sent();
                        if (this.breakDialog)
                            return [3 /*break*/, 4];
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.ele_sound.pause();
                        //Render full text when broke out
                        if (this.breakDialog) {
                            this.ele_text.textContent = targetDialog;
                        }
                        this.breakDialog = false;
                        this.rendering = false;
                        this.renderEventList = {};
                        if (!this.autoPlay) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.delay(3000)];
                    case 5:
                        _a.sent();
                        _dialog.next();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Dialog.prototype.next = function () {
        if (Dialog.rendering) {
            Dialog.breakDialog = true;
        }
        else {
            if (Dialog.currentDialog + 1 <= Dialog.dialogs.length - 1) {
                Dialog.currentDialog++;
                Dialog.render();
            }
            else {
                Dialog.dialogEnded = true;
                Dialog.toggleCursor(false);
            }
        }
    };
    Dialog.next = function () {
        _dialog.next();
    };
    Dialog.untilEnd = function () {
        var flagCheckInterval;
        return new Promise(function (resolve) {
            flagCheckInterval = setInterval(function () {
                if (Dialog.dialogEnded) {
                    clearInterval(flagCheckInterval);
                    resolve();
                }
            }, 100);
        });
    };
    Dialog.toggleCursor = function (state) {
        state ? Dialog.ele_dialogCursor.style.display = "block" : Dialog.ele_dialogCursor.style.display = "none";
    };
    Dialog.setHeight = function (height) {
        Dialog.ele.style.height = height + "%";
    };
    Dialog.addGlossary = function (glossaries) {
        Dialog.glossaries = __spreadArray(__spreadArray([], Dialog.glossaries, true), glossaries, true);
    };
    Dialog.parser = function (dialog) {
        var _this = this;
        var tagMap = {};
        var tagFound = false;
        var validTag = false;
        var currentCommandIndex = 0;
        var currentCommandTag = [];
        var parsingGlossary = [];
        function isValidDecorator(input) {
            var decorators = ["#", "@"];
            if (decorators.includes(input))
                return true;
            return false;
        }
        var _loop_1 = function (i) {
            var currentValue = dialog[i];
            if (tagFound && !validTag && !isValidDecorator(currentValue)) {
                tagFound = false;
                validTag = false;
                currentCommandTag = [];
                currentCommandIndex = 0;
            }
            if (tagFound && isValidDecorator(currentValue)) {
                validTag = true;
            }
            if (tagFound && currentValue === " ") {
                currentCommandTag = currentCommandTag.slice(2, currentCommandTag.length);
                var tag_1 = currentCommandTag.join("");
                var targetGlossary = this_1.glossaries.filter(function (glo) { return glo.tag === tag_1; })[0];
                parsingGlossary.push(targetGlossary);
                tagMap[tag_1] =
                    tagFound = false;
                validTag = false;
            }
            if (currentValue === "[") {
                currentCommandIndex = i;
                tagFound = true;
            }
            ;
            if (tagFound) {
                currentCommandTag.push(currentValue);
            }
        };
        var this_1 = this;
        for (var i = 0; i < dialog.length; i++) {
            _loop_1(i);
        }
        if (!parsingGlossary)
            return dialog;
        parsingGlossary.forEach(function (glo) {
            if (glo.type === "text") {
                dialog = dialog.replace("[#" + glo.tag, glo.value);
            }
            if (glo.type === "function") {
                var startIndex = dialog.indexOf("[@" + glo.tag);
                var eventIndex = startIndex - 1 >= 0 ? startIndex - 1 : 0;
                _this.renderEventList[eventIndex] = glo;
                dialog = dialog.replace("[@" + glo.tag, "");
            }
        });
        return dialog;
    };
    Dialog._renderSpeed = 50;
    Dialog.dialogs = [];
    Dialog.glossaries = [];
    Dialog.currentDialog = 0;
    Dialog.breakDialog = false;
    Dialog.rendering = false;
    Dialog.dialogEnded = false;
    Dialog.renderEventList = {};
    Dialog.autoPlay = false;
    Dialog.ele = document.createElement("div");
    Dialog.ele_text = document.createElement("div");
    Dialog.ele_sound = document.createElement("audio");
    Dialog.ele_dialogCursor = document.createElement("img");
    //static ele_layer: HTMLDivElement = document.createElement("div");
    Dialog.ele_autoPlay = document.createElement("button");
    return Dialog;
}());
export { Dialog };
var _dialog = new Dialog();
