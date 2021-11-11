import { GCK } from "../../lib/CerceisKey.js";
function replacer(key, value) {
    if (key == "_gsap")
        return;
    else
        return value;
}
export const SaveGame = (u) => {
    const ele = document.createElement("a");
    const filename = u.name ? `${u.name}.dgipet` : `unknown.dgipet`;
    ele.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(GCK(JSON.stringify(u, replacer))));
    ele.setAttribute("download", filename);
    ele.style.display = "none";
    document.body.appendChild(ele);
    ele.click();
    document.body.removeChild(ele);
};
