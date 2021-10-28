import { RCK } from "../../lib/CerceisKey.js"
import { User } from "../GameEngine/User.js";

export const LoadGame = (): Promise<void>=>{
	return new Promise(resolve => {
		const ele = document.createElement("input")
		const loadhandler = (e) => {
			let file = e.target.files[0]
			let reader = new FileReader()
			reader.onload = async (e) => {
				const result = JSON.parse(RCK(e.target.result.toString()));
				await User.loadUser(result)
				resolve()
			}
			reader.readAsText(file)
		}
		ele.setAttribute("type", "file")
		ele.setAttribute("accept", ".dgipet")
		ele.addEventListener("change", loadhandler, false)
		ele.click()
	})
}