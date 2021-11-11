var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class onRoundStartClass {
    constructor() {
        this._onRoundStartEventList = [];
    }
    get onRoundStartEventList() { return this._onRoundStartEventList; }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this._onRoundStartEventList.length; i++) {
                if (this._onRoundStartEventList[i].triggered === false && this._onRoundStartEventList[i].onTrigger) {
                    yield this._onRoundStartEventList[i].onTrigger();
                    this._onRoundStartEventList[i].triggered = true;
                }
                yield this._onRoundStartEventList[i].onEvery();
            }
        });
    }
    nextTick() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this._onRoundStartEventList.length; i++)
                this._onRoundStartEventList[i].ticksUntilExp -= 1;
            let expiredId = [];
            for (let i = 0; i < this._onRoundStartEventList.length; i++) {
                if (this._onRoundStartEventList[i].ticksUntilExp === 0) {
                    yield this._onRoundStartEventList[i].onExpire();
                    this._onRoundStartEventList[i].trackerId;
                    expiredId.push(this._onRoundStartEventList[i].trackerId);
                }
            }
            if (expiredId.length > 0)
                this.deleteEvent(expiredId);
        });
    }
    addEvent(event) {
        let tmp = {
            trackerId: event.trackerId,
            ticksUntilExp: event.ticksUntilExp,
            triggered: false,
            onTrigger() {
                return __awaiter(this, void 0, void 0, function* () { event.onTrigger ? yield event.onTrigger() : null; });
            },
            onEvery() {
                return __awaiter(this, void 0, void 0, function* () { event.onEvery ? yield event.onEvery() : null; });
            },
            onExpire() {
                return __awaiter(this, void 0, void 0, function* () { event.onExpire ? yield event.onExpire() : null; });
            },
        };
        this._onRoundStartEventList.push(tmp);
    }
    deleteEvent(trackerIds) {
        trackerIds.forEach(id => {
            const expiredIndex = this._onRoundStartEventList.findIndex(event => event.trackerId === id);
            this._onRoundStartEventList.splice(expiredIndex, 1);
        });
    }
}
export const onRoundStart = new onRoundStartClass();
