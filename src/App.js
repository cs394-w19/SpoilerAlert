import React, { Component } from 'react'
import './App.css'
import FridgeList from './Components/FridgeList.js'
import ShoppingList from './Components/ShoppingList.js'
import Settings from './Components/Settings.js'
import NewMenu from './Components/NewMenu.js'
import NavBar from './Components/NavBar.js'
import firebase from "firebase"
import { timingSafeEqual } from 'crypto';

var config = {
    apiKey: "AIzaSyDAnOBtoL7VHdV-VYd2Tcr0FLv5elDaN8A",
    authDomain: "spoileralert-394.firebaseapp.com",
    databaseURL: "https://spoileralert-394.firebaseio.com",
    storageBucket: "spoileralert-394.appspot.com",
};
firebase.initializeApp(config);

const PageEnum = {
	FRIDGE : 1,
	SHOPPING : 2,
	SETTINGS : 3,
}

class App extends Component {
	constructor() {
		super();

		let self = this; // needed in callbacks

		let fridgeBuf = {}; 
		firebase.database().ref('fridge').orderByChild('1').once('value', function(snapshot) {
			snapshot.forEach((child) => {
				fridgeBuf[child.key] = child.val();
				self.setState({page : PageEnum.FRIDGE}); // retrieval is async, so set again to display landing page properly
			})
		});
		
		let shoppingBuf = [];
		firebase.database().ref('shopping').once('value', function(snapshot) {
			snapshot.forEach((child) => {
				shoppingBuf.push(child.val());
			})
		});

		this.state = {
			showMenu : false,
			page : PageEnum.FRIDGE,
			shoppingItems : shoppingBuf,
			fridgeItems : fridgeBuf
		};
	}

	toggleMenu = () => {
		this.setState({
			showMenu: !this.state.showMenu
		})
	}

	changePage = (newPage) => {
		this.setState({
			page: newPage
		});
		if (this.state.showMenu)
			this.toggleMenu();
	}

	addShopItem = (item_name) => {
		if (!this.state.shoppingItems.includes(item_name)) {
			let items_copy = this.state.shoppingItems;
			items_copy.push(item_name);
			this.setState({shoppingItems: items_copy});
			
			let shoppingRef = firebase.database().ref('shopping');
			let writeLoc = shoppingRef.push();
			writeLoc.set(item_name);
		}
	}

	delShopItem = (item) => {
		let items_copy = this.state.shoppingItems;
		let index = items_copy.indexOf(item)
		if (index !== -1) {
			items_copy.splice(index, 1);
			this.setState({shoppingItems: items_copy});
		}

		let shoppingRef = firebase.database().ref('shopping');
		shoppingRef.orderByValue().equalTo(item).once('child_added', function(snapshot) {
			snapshot.ref.remove();
		})
	}

	shoppingToFridge = (item_name, quantity, days_til) => {
		//add item from the shopping list to fridge....probably need to rename
		this.delShopItem(item_name);
		this.addFridgeItem(item_name, quantity, days_til);
	}

	editShoppingItem = (old_item, new_item) => {
		if (old_item !== new_item) {
			let new_items = this.state.shoppingItems.slice();
			let index = new_items.indexOf(old_item);
			new_items[index] = new_item;
			this.setState({shoppingItems : new_items});

			let shoppingRef = firebase.database().ref('shopping');
			shoppingRef.orderByValue().equalTo(old_item).once('child_added', function(snapshot) {
				snapshot.ref.set(new_item);
			})
		}
	}

	editFridgeItem = (old_item, new_item, new_quantity, new_days_til) => {
		let old_quantity = this.state.fridgeItems[old_item][0];
		if (new_quantity <= 0)
		{
			this.delFridgeItem(old_item, old_quantity);
			return;
		}

		let old_days_til = this.state.fridgeItems[old_item][1];
		new_quantity = parseInt(new_quantity, 10);
		new_days_til = parseInt(new_days_til, 10);

		if (old_item === new_item && old_days_til === new_days_til) {
			let new_items = {};
			Object.entries(this.state.fridgeItems).map(([k, v]) => {
				if (k === new_item) {
					new_items[k] = [new_quantity, new_days_til];
				}
				else {
					new_items[k] = v;
				}
				return null; //This is suppress a warning associated with map
			});
			this.setState({fridgeItems : new_items});
			firebase.database().ref('fridge').child(old_item).update([new_quantity, old_days_til]);
		}
		else {
			this.delFridgeItem(old_item, old_quantity);
			this.addFridgeItem(new_item, new_quantity, new_days_til);
		}
	}

	fridgeToShopping = (item_name) => {
		//this.delFridgeItem(item_name);
		this.addShopItem(item_name);
	}

	delFridgeItem = (item, quantity) => {
		let items_copy = this.state.fridgeItems;
		let data = items_copy[item];
		let item_quantity = data[0];
		let item_date = data[1];

		if(item_quantity == quantity) {
			delete items_copy[item];
			firebase.database().ref('fridge').child(item).remove();
		}
		else {
			let new_quantity = item_quantity - quantity;
			items_copy[item] = [new_quantity,item_date]
			firebase.database().ref('fridge').child(item).update({0 : new_quantity});
		}

		this.setState({fridgeItems: items_copy})
  	}

  	addFridgeItem = (item_name, quantity, days_til) => {
		quantity = parseInt(quantity, 10);
		let self = this;
		let new_quantity = 0;
		let new_days_til = 0;
		let itemIsNew = true;
		let reorderNeeded = false;

		// copy dict into array for easier sorting
		let dictBuf = Object.keys(this.state.fridgeItems).map(function(curItem) {
			if (curItem === item_name) {
				itemIsNew = false;

				let curInfo = self.state.fridgeItems[curItem];
				let old_quantity = curInfo[0]
				let old_days_til = curInfo[1];

				new_quantity = old_quantity + quantity;

				// case 1: item exists, expiry changed -> reorder
				if (days_til > old_days_til) {
					reorderNeeded = true;
					new_days_til = days_til;
					return [curItem, [new_quantity, new_days_til]]
				}
				// case 2: item exists, expiry same -> no reorder
				else {
					new_days_til = old_days_til;
					return [curItem, [new_quantity, new_days_til]]
				}
			}
			else {
				return [curItem, self.state.fridgeItems[curItem]];
			}
		});

		// case 3: completely new item -> reorder
		if (itemIsNew) {
			new_quantity = quantity;
			new_days_til = days_til;
			dictBuf.push([item_name, [quantity, days_til]])
			reorderNeeded = true;
		}

		if (reorderNeeded) {
			dictBuf.sort(function(a, b) {
				let days_til_a = a[1][1];
				let days_til_b = b[1][1];
				return days_til_a - days_til_b;
			});
		}

		// copy back into dict
		let new_items = {};
		dictBuf.forEach(element => {
			new_items[element[0]] = element[1];
		});
		
		this.setState({ fridgeItems: new_items});

		firebase.database().ref('fridge').update({
			[item_name] : [new_quantity, new_days_til]});
  	}

  	checkExpiry = () => {
  		var expired_items = [];
  		for (const [key, value] of Object.entries(this.state.fridgeItems)) {
		  if(value <= 0)
		  	expired_items.push(key);
		};
		console.log(expired_items.length);
		if(expired_items.length == 1)
			alert(expired_items + " has expired.\nAdded to shopping list");
		else if(expired_items.length > 1) {
			let exp_string = "";
			expired_items.forEach((item) =>
				exp_string += item.charAt(0).toUpperCase() + item.slice(1) + ", ")
			alert(exp_string.substring(0, exp_string.length-2) + " have expired.\nAdded to shopping list");
		}
		
		for (let i = 0; i < expired_items.length; i++)
		{
			this.addShopItem(expired_items[i]);
			for (let j = 0; j < Object.keys(this.state.fridgeItems).length; j++)
			{
				if (Object.keys(this.state.fridgeItems)[j] === expired_items[i])
					this.delFridgeItem(Object.keys(this.state.fridgeItems)[j]);
			}
		}
  	};

	render() {
		let current_page = null;

		switch(this.state.page) {
			case PageEnum.FRIDGE:
				current_page = <FridgeList items={this.state.fridgeItems} 
											delItem={this.delFridgeItem} 
											addItem={this.addFridgeItem}
											editItem={this.editFridgeItem}
											checkExpiry={this.checkExpiry}
											toShopping={this.fridgeToShopping}/>
				break;

			case PageEnum.SHOPPING:
				current_page = <ShoppingList items={this.state.shoppingItems}
											 addItem={this.addShopItem}
											 delItem={this.delShopItem}
											 editItem={this.editShoppingItem}
											 addToFridge={this.shoppingToFridge}/>
				break;

			case PageEnum.SETTINGS:
				current_page = <Settings/>
				break;

			default:
				current_page = <FridgeList items={this.state.fridgeItems} 
											delItem={this.delFridgeItem} 
											addItem={this.addFridgeItem}
											checkExpiry={this.checkExpiry}
											toShopping={this.fridgeToShopping}/>
		}
		
		return (
			<div className="app">
				<NavBar className="navigation" 
						enum={PageEnum} 
						changePage={i => this.changePage(i)}></NavBar>
						<br/>

				
				{current_page}

			</div>
		);
	}
}

export default App;
