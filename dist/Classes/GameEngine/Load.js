var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RCK } from "../../lib/CerceisKey.js";
import { User } from "../GameEngine/User.js";
export const LoadGame = () => {
    return new Promise(resolve => {
        const ele = document.createElement("input");
        const loadhandler = (e) => {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = (e) => __awaiter(void 0, void 0, void 0, function* () {
                const result = JSON.parse(RCK(e.target.result.toString()));
                yield User.loadUser(result);
                resolve();
            });
            reader.readAsText(file);
        };
        ele.setAttribute("type", "file");
        ele.setAttribute("accept", ".dgipet");
        ele.addEventListener("change", loadhandler, false);
        ele.click();
    });
};
