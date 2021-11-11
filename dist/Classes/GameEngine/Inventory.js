var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ControlDialog } from "../VisualControls/Dialog.js";
import { Dialog } from "./Dialog.js";
/*
┌────────────────────────────────────────────────────────────┐
│                         Container                          │
│  ┌────────────┐   ┌─────────────────────────────────────┐  │
│  │            │   │              Item name              │  │
│  │            │   └─────────────────────────────────────┘  │
│  │    Icon    │   ┌─────────────────┐┌──────────────────┐  │
│  │            │   │      Item       ││       Item       │  │
│  │            │   │      Count      ││      Rarity      │  │
│  └────────────┘   └─────────────────┘└──────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                                                      │  │
│  │                                                      │  │
│  │                      Controls                        │  │
│  │                                                      │  │
│  │                                                      │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
*/
let itemUsedCheckInterval = null;
let itemUsed = false;
let closeInventory = false;
export class InventorySlotContainer {
    constructor(item, count) {
        this.ele = document.createElement("div");
        const eleStyle = `
			background: rgb(55,55,55);
			width:100%;
			display: grid; 
			grid-template-columns: 1fr 1fr 1fr; 
			grid-template-rows: 0.8fr 0.8fr 0.4fr; 
			gap: 0px 0px; 
			grid-template-areas: 
				"itemIcon itemName itemName"
				"itemIcon itemCount itemRarity"
				"itemControls itemControls itemControls";
			border: 1px solid rgba(255,255,255,.3);
			border-radius: .5em;
		`;
        this.ele.setAttribute("style", eleStyle);
        //itemIcon
        const itemIcon = document.createElement("div");
        const itemIconStyle = `
			display:grid;
			place-items: center;
			grid-area: itemIcon;			
		`;
        itemIcon.setAttribute("style", itemIconStyle);
        itemIcon.setAttribute("class", "itemIcon");
        itemIcon.innerHTML = `<g-icon name="${item.itemIcon}" width="64" height="64"></g-icon>`;
        //itemName
        const itemName = document.createElement("div");
        const itemNameStyle = `
			display:flex;
			justify-content:center;
			align-items: center;
			grid-area: itemName;			
		`;
        itemName.setAttribute("style", itemNameStyle);
        itemName.setAttribute("class", "itemName");
        itemName.innerHTML = `${item.name}`;
        //itemCount
        const itemCount = document.createElement("div");
        const itemCountStyle = `
			display:flex;
			flex-direction:column;
			justify-content:center;
			grid-area: itemCount;	
			text-align:center; 		
		`;
        itemCount.setAttribute("style", itemCountStyle);
        itemCount.setAttribute("class", "itemCount");
        itemCount.innerHTML = `
			<span style="font-size:10%; opacity:.7;">Count</span>
			<span>${count}</span>
		`;
        //itemRarity
        const itemRarity = document.createElement("div");
        const itemRarityStyle = `
			display:flex;
			flex-direction:column;
			justify-content:center;
			grid-area: itemRarity;	
			text-align:center; 			
		`;
        itemRarity.setAttribute("style", itemRarityStyle);
        itemRarity.setAttribute("class", "itemRarity");
        itemRarity.innerHTML = `
			<span style="font-size:10%; opacity:.7;">Rarity</span>
			<span>${item.itemRarity}</span>
		`;
        //Create item info 
        //itemEffects
        const itemEffects = document.createElement("div");
        const itemEffectsStyle = ``;
        itemEffects.setAttribute("style", itemEffectsStyle);
        itemEffects.setAttribute("class", "itemEffects");
        let list = "";
        item.itemEffects.forEach(ab => {
            list += "<li>" + ab + "</li>";
        });
        itemEffects.innerHTML = `<ul>${list}</ul>`;
        const itemInfo = document.createElement("div");
        const itemInfoStyle = `
			display:grid;
			justify-items: center;
			font-size: 8px;
		`;
        itemInfo.setAttribute("style", itemInfoStyle);
        itemInfo.innerHTML = `
				${itemIcon.innerHTML}
				${itemName.innerHTML}
				${itemRarity.innerHTML}
				${itemEffects.innerHTML}
				<div style="word-break:break-all;">
					${item.description}
				</div>
		`;
        //itemControls
        const itemControls = document.createElement("div");
        const itemControlsStyle = `
			grid-area: itemControls;
			display:flex;
			padding: 0 .5em;
		`;
        itemControls.setAttribute("style", itemControlsStyle);
        itemControls.setAttribute("class", "itemControls");
        //Adding buttons to controls
        const buttons = [
            {
                inner: "USE",
                func() {
                    return __awaiter(this, void 0, void 0, function* () {
                        const success = yield item.use();
                        closeInventory = true;
                        if (success) {
                            Dialog.setDialog([`Used ${item.name}`]);
                            yield Dialog.untilEnd();
                        }
                        itemUsed = true;
                        //TODO remove item
                    });
                }
            },
            {
                inner: "INFO",
                func() {
                    const ctrl = new ControlDialog(itemInfo.outerHTML);
                    ctrl.open();
                }
            },
            {
                inner: `<i-con name="trash"></i-con>`,
                func() { }
            }
        ];
        buttons.forEach(btn => {
            const tmp = document.createElement("button");
            tmp.setAttribute("style", "width:100%; font-family:inherit;");
            tmp.innerHTML = btn.inner;
            tmp.onclick = () => __awaiter(this, void 0, void 0, function* () { return yield btn.func(); });
            itemControls.appendChild(tmp);
        });
        this.ele.appendChild(itemIcon);
        this.ele.appendChild(itemName);
        this.ele.appendChild(itemCount);
        this.ele.appendChild(itemRarity);
        this.ele.appendChild(itemControls);
    }
}
class InventoryClass {
    constructor() {
        /* save */
        this.slotCount = 64;
        /*
            During save, items will be parsed to objName
        */
        this.items = [];
        /* not saved */
        this.ele = document.createElement("div");
        this.bagCon = document.createElement("div");
        this.innerCon = document.createElement("div");
        this.subTitleEle = document.createElement("div");
        this.filteredItems = [];
        //Main container
        const eleStyle = `
			display:grid;
			justify-content:center;
			position:fixed;
			z-index:2;
			top:0;
			left:0;
			height:100%;
			width:100vw;
		`;
        this.ele.setAttribute("style", eleStyle);
        this.ele.setAttribute("class", "scale-in-center");
        //Inner container
        const innerCon_Style = `
			position:relative;
			height:97.5vh;
			width:95vw;
			max-width: 600px;
			border:1px solid white;
			border-radius:.5em;
			background:rgba(35,35,55, .9);
			padding:.5em;
		`;
        this.innerCon.setAttribute("style", innerCon_Style);
        //Close button
        const closeBtnStyle = `
			position:absolute;
			top:1em;
			right:1em;
			cursor:pointer;
		`;
        const closeBtn = document.createElement("span");
        closeBtn.setAttribute("style", closeBtnStyle);
        closeBtn.innerHTML = `<i-con name="close"></i-con>`;
        //Title
        const titleEle = document.createElement("h3");
        titleEle.textContent = `Inventory`;
        //SubTitle
        this.subTitleEle.setAttribute("style", "font-size: 70%; opacity:.7;");
        this.subTitleEle.textContent = `${this.items.length}/${this.slotCount}`;
        //Events
        this.ele.onclick = () => { this.close(); };
        this.innerCon.onclick = (e) => { e.stopPropagation(); };
        closeBtn.onclick = () => { this.close(); };
        //Bag container 
        const bagConStyle = `
			display:grid;
			grid-template-columns: repeat( auto-fit, minmax(280px, 1fr) );
			gap:.5em;
		`;
        this.bagCon.setAttribute("style", bagConStyle);
        //Filter bar
        const filterInputContainer = document.createElement("div");
        filterInputContainer.setAttribute("style", "display:flex; justify-content:center;");
        const filterInput = document.createElement("input");
        const filterInputStyle = `
			font-family:inherit;
			padding:1em;
			width:91%;
			margin-bottom:1em;
		`;
        filterInput.placeholder = "Search...";
        filterInput.setAttribute("style", filterInputStyle);
        filterInputContainer.appendChild(filterInput);
        filterInput.onkeyup = () => {
            this.filteredItems = this.items.filter(i => {
                return i.item.name.toUpperCase().includes(filterInput.value.toUpperCase());
            });
            this.renderContent();
        };
        this.filteredItems = this.items;
        this.renderContent();
        this.innerCon.appendChild(closeBtn);
        this.innerCon.appendChild(titleEle);
        this.innerCon.appendChild(this.subTitleEle);
        this.innerCon.appendChild(filterInputContainer);
        this.innerCon.appendChild(this.bagCon);
        this.ele.appendChild(this.innerCon);
        console.log(this.items);
    }
    load(data) {
        this.items = data.items;
        this.slotCount = data.slotCount;
        this.filteredItems = this.items;
        this.renderContent();
    }
    renderContent() {
        this.bagCon.innerHTML = "";
        this.filteredItems.forEach(i => {
            const slotItem = new InventorySlotContainer(i.item, i.count);
            this.bagCon.appendChild(slotItem.ele);
        });
    }
    addItems(items) {
        //Check max slot
        if (this.items.length >= this.slotCount)
            console.log("Bag is full");
        items.forEach(item => {
            const existAndStackable = this.items.findIndex(i => i.item.objName === item.objName && item.stackable && i.count < item.stackLimit);
            if (existAndStackable !== -1 && this.items[existAndStackable].count < item.stackLimit) {
                this.items[existAndStackable].data.push(item);
                this.items[existAndStackable].count += 1;
            }
            else {
                this.items.push({
                    data: [item],
                    count: 1,
                    item: item,
                    objName: item.objName
                });
            }
        });
        this.subTitleEle.textContent = `${this.items.length}/${this.slotCount}`;
        this.renderContent();
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                document.body.appendChild(this.ele);
                itemUsedCheckInterval = setInterval(() => {
                    if (itemUsed && closeInventory) {
                        itemUsed = false;
                        closeInventory = false;
                        this.ele.style.display = "grid";
                        clearInterval(itemUsedCheckInterval);
                        resolve();
                    }
                    if (closeInventory) {
                        this.ele.style.display = "none";
                    }
                }, 100);
            });
        });
    }
    close() {
        clearInterval(itemUsedCheckInterval);
        itemUsed = false;
        document.body.removeChild(this.ele);
    }
    get itemCount() { return this.items.length; }
}
export const Inventory = new InventoryClass();
