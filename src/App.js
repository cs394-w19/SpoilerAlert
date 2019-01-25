import React, { Component } from 'react'
import './App.css'
import FridgeList from './Components/FridgeList.js'
import ShoppingList from './Components/ShoppingList.js'
import Settings from './Components/Settings.js'
import Menu from './Components/Menu.js'
import NewMenu from './Components/NewMenu.js'
import firebase from "firebase"

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
		firebase.database().ref('fridge').orderByValue().once('value', function(snapshot) {
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
		let items_copy = this.state.shoppingItems;
		items_copy.push(item_name);
		this.setState({shoppingItems: items_copy});

		let shoppingRef = firebase.database().ref('shopping');
		let writeLoc = shoppingRef.push();
		writeLoc.set(item_name);
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
		}
		else {
			let new_quantity = item_quantity - quantity;
			items_copy[item] = [new_quantity,item_date]
		}
		this.setState({fridgeItems: items_copy})
		
		firebase.database().ref('fridge').child(item).remove();
  	}

  	addFridgeItem = (item_name, quantity, days_til) => {
    	let new_items = {};
    	let added = false;
    	quantity = parseInt(quantity, 10);
    	Object.entries(this.state.fridgeItems).map(([n, d]) => {
      		new_items[n] = d;
      		//return null //This is suppress a warning associated with map
    	});
		if (item_name in new_items) {
			let cur_item = new_items[item_name];
			let new_quantity = cur_item[0] + quantity;
			let cur_date = cur_item[1];
			if(days_til > cur_date)
				new_items[item_name] = [new_quantity, days_til]; //only change expiry date if the newly purchased item has a later expiry
			else
				new_items[item_name] = [new_quantity, cur_date];
		}
		else
			new_items[item_name] = [quantity, days_til];


		this.setState({
			fridgeItems: new_items
		});

		firebase.database().ref('fridge').update({[item_name] : [quantity, days_til]});
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
											checkExpiry={this.checkExpiry}
											toShopping={this.fridgeToShopping}/>
				break;

			case PageEnum.SHOPPING:
				current_page = <ShoppingList items={this.state.shoppingItems}
											 addItem={this.addShopItem}
											 delItem={this.delShopItem}
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
				<NewMenu className="menu" enum={PageEnum} 
						 toggleMenu={i => this.toggleMenu(i)} 
						 changePage={i => this.changePage(i)}
						 state={this.state.showMenu}></NewMenu>
				{current_page}
			</div>
		);
	}
}

export default App;
