import { Item } from "../GameObjects/Items/Item.js";
import { ControlDialog } from "../VisualControls/Dialog.js"
import { Dialog } from "./Dialog.js"

interface InventorySlot{
	data:any[],//GameItem[] 
	count: number,
	item: any, //Act as a reference template.
	objName: string
}
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
let itemUsedCheckInterval: any = null;
let itemUsed: boolean = false;
let closeInventory: boolean = false;

export class InventorySlotContainer{
	public ele: HTMLDivElement = document.createElement("div");

	constructor(item: Item, count: number){
		const eleStyle: string = `
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
		const itemIcon: HTMLDivElement = document.createElement("div");
		const itemIconStyle: string = `
			display:grid;
			place-items: center;
			grid-area: itemIcon;			
		`
		itemIcon.setAttribute("style", itemIconStyle)
		itemIcon.setAttribute("class", "itemIcon")
		itemIcon.innerHTML = `<g-icon name="${item.itemIcon}" width="64" height="64"></g-icon>`
		
		//itemName
		const itemName: HTMLDivElement = document.createElement("div");
		const itemNameStyle: string = `
			display:flex;
			justify-content:center;
			align-items: center;
			grid-area: itemName;			
		`
		itemName.setAttribute("style", itemNameStyle)
		itemName.setAttribute("class", "itemName")
		itemName.innerHTML = `${item.name}`

		//itemCount
		const itemCount: HTMLDivElement = document.createElement("div");
		const itemCountStyle: string = `
			display:flex;
			flex-direction:column;
			justify-content:center;
			grid-area: itemCount;	
			text-align:center; 		
		`
		itemCount.setAttribute("style", itemCountStyle)
		itemCount.setAttribute("class", "itemCount")
		itemCount.innerHTML = `
			<span style="font-size:10%; opacity:.7;">Count</span>
			<span>${count}</span>
		`

		//itemRarity
		const itemRarity: HTMLDivElement = document.createElement("div");
		const itemRarityStyle: string = `
			display:flex;
			flex-direction:column;
			justify-content:center;
			grid-area: itemRarity;	
			text-align:center; 			
		`
		itemRarity.setAttribute("style", itemRarityStyle)
		itemRarity.setAttribute("class", "itemRarity")
		itemRarity.innerHTML = `
			<span style="font-size:10%; opacity:.7;">Rarity</span>
			<span>${item.itemRarity}</span>
		`


		//Create item info 
		//itemEffects
		const itemEffects: HTMLDivElement = document.createElement("div");
		const itemEffectsStyle: string = ``
		itemEffects.setAttribute("style", itemEffectsStyle)
		itemEffects.setAttribute("class", "itemEffects")
		let list: string = ""
		item.itemEffects.forEach(ab => {
			list += "<li>"+ab+"</li>"
		});
		itemEffects.innerHTML = `<ul>${list}</ul>`

		const itemInfo: HTMLDivElement = document.createElement("div");
		const itemInfoStyle: string = `
			display:grid;
			justify-items: center;
			font-size: 8px;
		`
		itemInfo.setAttribute("style", itemInfoStyle)
		itemInfo.innerHTML = `
				${itemIcon.innerHTML}
				${itemName.innerHTML}
				${itemRarity.innerHTML}
				${itemEffects.innerHTML}
				<div style="word-break:break-all;">
					${item.description}
				</div>
		`

		//itemControls
		const itemControls: HTMLDivElement = document.createElement("div");
		const itemControlsStyle: string = `
			grid-area: itemControls;
			display:flex;
			padding: 0 .5em;
		`
		itemControls.setAttribute("style", itemControlsStyle)
		itemControls.setAttribute("class", "itemControls")
		//Adding buttons to controls
		const buttons: any[] = [
			{
				inner:"USE",
				async func(){
					const success = await item.use()
					closeInventory = true;
					if(success){
						Dialog.setDialog([`Used ${item.name}`])
						await Dialog.untilEnd()
					}
					itemUsed = true;
					//TODO remove item
				}
			},
			{
				inner:"INFO",
				func(){
					const ctrl = new ControlDialog(itemInfo.outerHTML);
					ctrl.open();
				}
			},
			{
				inner:`<i-con name="trash"></i-con>`,
				func(){}
			}
		]
		buttons.forEach(btn => {
			const tmp: HTMLButtonElement = document.createElement("button");
			tmp.setAttribute("style", "width:100%; font-family:inherit;");
			tmp.innerHTML = btn.inner;
			tmp.onclick = async() => await btn.func()
			itemControls.appendChild(tmp)
		})

		this.ele.appendChild(itemIcon);
		this.ele.appendChild(itemName);
		this.ele.appendChild(itemCount);
		this.ele.appendChild(itemRarity);
		this.ele.appendChild(itemControls);
	}
}

class InventoryClass{
	
	/* save */
	public slotCount: number = 64;
	/*
		During save, items will be parsed to objName
	*/
	public items: InventorySlot[] = [
	];
	/* not saved */
	public ele: HTMLDivElement = document.createElement("div");
	public bagCon: HTMLDivElement = document.createElement("div")
	public innerCon: HTMLDivElement = document.createElement("div");
	public subTitleEle: HTMLElement = document.createElement("div");
	public filteredItems: any = [];

	load(data){
		this.items = data.items;
		this.slotCount = data.slotCount;
		this.filteredItems = this.items;
		this.renderContent();
	}
	
	constructor(){
		//Main container
		const eleStyle: string = `
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
		const innerCon_Style: string = `
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
		const closeBtnStyle: string = `
			position:absolute;
			top:1em;
			right:1em;
			cursor:pointer;
		`;
		const closeBtn: HTMLSpanElement = document.createElement("span");
		closeBtn.setAttribute("style", closeBtnStyle);
		closeBtn.innerHTML = `<i-con name="close"></i-con>`;

		//Title
		const titleEle: HTMLElement = document.createElement("h3");
		titleEle.textContent = `Inventory`;

		//SubTitle
		this.subTitleEle.setAttribute("style", "font-size: 70%; opacity:.7;")
		this.subTitleEle.textContent = `${this.items.length}/${this.slotCount}`;

		//Events
		this.ele.onclick = () => { this.close() };
		this.innerCon.onclick = (e) =>{ e.stopPropagation() };
		closeBtn.onclick = () => { this.close() };

		//Bag container 
		const bagConStyle: string = `
			display:grid;
			grid-template-columns: repeat( auto-fit, minmax(280px, 1fr) );
			gap:.5em;
		`;
		this.bagCon.setAttribute("style", bagConStyle);
		
		//Filter bar
		const filterInputContainer = document.createElement("div");
		filterInputContainer.setAttribute("style", "display:flex; justify-content:center;")
		const filterInput = document.createElement("input");
		const filterInputStyle: string = `
			font-family:inherit;
			padding:1em;
			width:91%;
			margin-bottom:1em;
		`;
		filterInput.placeholder = "Search..."
		filterInput.setAttribute("style", filterInputStyle);
		filterInputContainer.appendChild(filterInput)
		filterInput.onkeyup = () => {
			this.filteredItems = this.items.filter(i => {
				return i.item.name.toUpperCase().includes(filterInput.value.toUpperCase())
			})
			this.renderContent()
		}
		this.filteredItems = this.items;
		this.renderContent();

		this.innerCon.appendChild(closeBtn);
		this.innerCon.appendChild(titleEle);
		this.innerCon.appendChild(this.subTitleEle);
		this.innerCon.appendChild(filterInputContainer);
		this.innerCon.appendChild(this.bagCon)
		this.ele.appendChild(this.innerCon);

		console.log(this.items);

	}

	public renderContent(): void{
		this.bagCon.innerHTML = ""
		this.filteredItems.forEach(i => {
			const slotItem = new InventorySlotContainer(i.item, i.count)
			this.bagCon.appendChild(slotItem.ele)
		})
	}
	
	public addItems(items: any[]): void{ //items = Items
		//Check max slot
		if(this.items.length >= this.slotCount) console.log("Bag is full");
		items.forEach(item => {
			const existAndStackable = this.items.findIndex(i => i.item.objName === item.objName && item.stackable && i.count<item.stackLimit)
			if(existAndStackable !== -1 && this.items[existAndStackable].count < item.stackLimit){
				this.items[existAndStackable].data.push(item);
				this.items[existAndStackable].count += 1;
			}else{
				this.items.push({
					data:[item],
					count: 1,
					item: item,
					objName: item.objName
				})
			}
		});
		this.subTitleEle.textContent = `${this.items.length}/${this.slotCount}`;
		this.renderContent()
	}

	public async open(): Promise<void>{ 
		return new Promise((resolve)=>{
			document.body.appendChild(this.ele) 
			itemUsedCheckInterval = setInterval(()=>{
				if(itemUsed && closeInventory){
					itemUsed = false;
					closeInventory = false
					this.ele.style.display = "grid";
					clearInterval(itemUsedCheckInterval);
					resolve();
				}
				if(closeInventory){
					this.ele.style.display = "none";
				}
			}, 100)
		})
	}
	public close(): void{ 
		clearInterval(itemUsedCheckInterval);
		itemUsed = false;
		document.body.removeChild(this.ele) 
	}
	get itemCount(): number{ return this.items.length }

}


export const Inventory = new InventoryClass();