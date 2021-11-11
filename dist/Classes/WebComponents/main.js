import { IconComponent } from "./Icon.js";
import { GameIconComponent } from "./GameIcon.js";
export const initComponents = () => {
    window.customElements.define("i-con", IconComponent);
    window.customElements.define("g-icon", GameIconComponent);
};
