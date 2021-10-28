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
import { GetRandom } from "../../lib/GetRandom.js";
import { Dialog } from "../../Classes/GameEngine/Dialog.js";
import { ControlInput } from "../../Classes/VisualControls/Input.js";
import { Controller } from "../../Classes/GameEngine/Controller.js";
import { Screen } from "../../Classes/GameEngine/Screen.js";
import { ControlButton } from "../../Classes/VisualControls/Button.js";
import { Sound } from "../../Classes/GameEngine/Sound.js";
import { Animator } from "../../Classes/GameEngine/Animator.js";
import { User } from "../../Classes/GameEngine/User.js";
import { gsap } from "../../../exlib/GSAP/index.js";
import { HomeScene } from "../HomeScene/HomeScene.js";
import dlg from "./dialogs/main.js";
var listOfPossibleStarters = [
    "Nyaromon", "Popomon", "Jyarimon"
];
var numbersOfCandidate = 2;
var UserCreationScene = /** @class */ (function () {
    function UserCreationScene() {
        //public animator: Animator = new Animator(300);
        this.candidates = [];
        this.candidatesClass = [];
        this._imports = {};
        this.userName = "";
        //Logics
        this.candidates = GetRandom(__spreadArray([], listOfPossibleStarters, true), numbersOfCandidate, true);
        this.initImports();
        this._startScene();
    }
    UserCreationScene.prototype._startScene = function () {
        return __awaiter(this, void 0, void 0, function () {
            var selectedPartner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._part1()];
                    case 1:
                        _a.sent();
                        new Sound("reward.wav");
                        return [4 /*yield*/, this._part2()];
                    case 2:
                        selectedPartner = _a.sent();
                        User.partners.push(selectedPartner);
                        this.candidatesClass.forEach(function (candidate) {
                            if (candidate.name !== selectedPartner.name) {
                                gsap.to(candidate.ele, { opacity: 0, duration: .5 });
                            }
                            else {
                                gsap.to(candidate.ele, { left: "50%", top: "50%", x: "-50%", y: "-50%", duration: .5, overwrite: true });
                            }
                        });
                        return [4 /*yield*/, this._part3(selectedPartner.name)];
                    case 3:
                        _a.sent();
                        Dialog.clear();
                        Screen.delete();
                        new HomeScene();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserCreationScene.prototype.initImports = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, candidate, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(i < this.candidates.length)) return [3 /*break*/, 4];
                        candidate = this.candidates[i];
                        _a = this._imports;
                        _b = candidate;
                        return [4 /*yield*/, import("./../../Classes/Characters/" + candidate + ".js")];
                    case 2:
                        _a[_b] = _c.sent();
                        this.candidatesClass.push(new this._imports[candidate][candidate]);
                        _c.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserCreationScene.prototype._part1 = function () {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var userNameInput, userNameBtn;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Dialog.addGlossary([
                            {
                                tag: "numberOfCandidate",
                                type: "text",
                                value: numbersOfCandidate.toString()
                            },
                        ]);
                        Dialog.setDialog(dlg.D001);
                        return [4 /*yield*/, Dialog.untilEnd()];
                    case 1:
                        _a.sent();
                        userNameInput = new ControlInput("What is your name?", 2, 12);
                        userNameBtn = new ControlButton("Confirm");
                        userNameBtn.ele.disabled = true;
                        userNameInput.bindEvent("keydown", function () {
                            if (userNameInput.value.length >= 2 && userNameInput.value.length <= 12)
                                userNameBtn.ele.disabled = false;
                            else
                                userNameBtn.ele.disabled = true;
                        });
                        userNameBtn.bindFunc(function () {
                            _this.userName = userNameInput.value;
                            User.name = _this.userName;
                            console.log(User);
                            Controller.delete();
                            resolve();
                        });
                        Controller.add([userNameInput.ele, userNameBtn.ele]);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    UserCreationScene.prototype._part2 = function () {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var candidateBtns, _loop_1, this_1, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Dialog.addGlossary([
                            {
                                tag: "playerName",
                                type: "text",
                                value: this.userName
                            },
                            {
                                tag: "showCandidate",
                                type: "function",
                                value: function () {
                                    Animator.addResources([
                                        _this.candidatesClass[0].animation, _this.candidatesClass[1].animation
                                    ]);
                                    _this.candidatesClass[0].ele.style.filter = "brightness(30%)";
                                    _this.candidatesClass[1].ele.style.filter = "brightness(30%)";
                                    Screen.draw(_this.candidatesClass[0].ele, 25, 50);
                                    Screen.draw(_this.candidatesClass[1].ele, 75, 50);
                                    Animator.start();
                                }
                            }
                        ]);
                        Dialog.setDialog(dlg.D002);
                        return [4 /*yield*/, Dialog.untilEnd()];
                    case 1:
                        _a.sent();
                        candidateBtns = [];
                        _loop_1 = function (i) {
                            candidateBtns.push(new ControlButton(this_1.candidatesClass[i].name));
                            candidateBtns[i].ele.addEventListener("mouseover", function () {
                                _this.candidatesClass[i].ele.style.filter = "brightness(100%)";
                                _this.candidatesClass[i].make("happy");
                            });
                            candidateBtns[i].ele.addEventListener("mouseleave", function () {
                                _this.candidatesClass[i].ele.style.filter = "brightness(30%)";
                                _this.candidatesClass[i].make("idle");
                            });
                            candidateBtns[i].bindFunc(function () {
                                Controller.delete();
                                resolve(_this.candidatesClass[i]);
                            });
                            Controller.add([candidateBtns[i].ele]);
                        };
                        this_1 = this;
                        for (i = 0; i < this.candidatesClass.length; i++) {
                            _loop_1(i);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    UserCreationScene.prototype._part3 = function (partnerName) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var questions, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Dialog.addGlossary([
                            {
                                tag: "partnerName",
                                type: "text",
                                value: partnerName
                            },
                        ]);
                        Dialog.setDialog(dlg.D003);
                        return [4 /*yield*/, Dialog.untilEnd()];
                    case 1:
                        _a.sent();
                        questions = [
                            {
                                control: new ControlButton("Who are you ?"),
                                func: function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    Controller.hide(true);
                                                    Dialog.setDialog(dlg.V003a1);
                                                    return [4 /*yield*/, Dialog.untilEnd()];
                                                case 1:
                                                    _a.sent();
                                                    Controller.hide(false);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                }
                            },
                            {
                                control: new ControlButton("What is this place ?"),
                                func: function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    Controller.hide();
                                                    Dialog.setDialog(dlg.V003b1);
                                                    return [4 /*yield*/, Dialog.untilEnd()];
                                                case 1:
                                                    _a.sent();
                                                    Controller.hide(false);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                }
                            },
                            {
                                control: new ControlButton("What are these... creatures ?"),
                                func: function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    Controller.hide();
                                                    Dialog.setDialog(dlg.V003c1);
                                                    return [4 /*yield*/, Dialog.untilEnd()];
                                                case 1:
                                                    _a.sent();
                                                    Controller.hide(false);
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                }
                            },
                            {
                                control: new ControlButton("Nothing, let's go!"),
                                func: function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    Controller.delete();
                                                    Dialog.setDialog(dlg.V003d1);
                                                    return [4 /*yield*/, Dialog.untilEnd()];
                                                case 1:
                                                    _a.sent();
                                                    resolve();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                }
                            }
                        ];
                        for (i = 0; i < questions.length; i++) {
                            questions[i].control.bindFunc(questions[i].func);
                            Controller.add([questions[i].control.ele]);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return UserCreationScene;
}());
export { UserCreationScene };
