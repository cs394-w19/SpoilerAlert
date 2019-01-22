import React, { Component } from 'react';
import './App.css';
import FridgeList from './Components/FridgeList.js'
import ShoppingList from './Components/ShoppingList.js'
import Settings from './Components/Settings.js'
import Menu from './Components/Menu.js'
import NewMenu from './Components/NewMenu.js';
import Drawer from '@material-ui/core/Drawer';
import shoppingData from './data/shopping.json';

const PageEnum = {
	FRIDGE : 1,
	SHOPPING : 2,
	SETTINGS : 3,
}

class App extends Component {
	/*constructor() {
    	super();
			this.state = {
				showMenu : false,
				page : PageEnum.FRIDGE,
				shoppingItems : shoppingData["shopping"],
				fridgeItems : {}
			};
	}*/
	state = {
		showMenu : false,
		page : PageEnum.FRIDGE,
		shoppingItems : shoppingData["shopping"],
		fridgeItems : {}
	};

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
	}

	delShopItem = (item) => {
		let items_copy = this.state.shoppingItems;
		//console.log(array);
		var index = items_copy.indexOf(item)
		//console.log(item);
		if (index !== -1) {
			items_copy.splice(index, 1);
			console.log(items_copy);
			this.setState({shoppingItems: items_copy});
		}
	}

	shoppingToFridge = (item_name, days_til) => {
		//add item from the shopping list to fridge....probably need to rename
		this.delShopItem(item_name);
		this.addFridgeItem(item_name, days_til);
	}

	delFridgeItem = (item) => {
		let items_copy = this.state.fridgeItems;
		delete items_copy[item];
    	this.setState({
    		fridgeItems: items_copy
    	})
  	}

  	addFridgeItem = (item_name, days_til) => {
    	let new_items = {};
    	let added = false;
    	Object.entries(this.state.fridgeItems).map(([n, d]) => {
      		if ((!added) && (d > days_til)) {
        		new_items[item_name] = days_til;
        		added = true;
      		}
      		new_items[n] = d;
      		return null //This is suppress a warning associated with map
    	});

		if (!added) {
			new_items[item_name] = days_til;
		}

		this.setState({
			fridgeItems: new_items
		});
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
			let exp_string = ""
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
											checkExpiry={this.checkExpiry}/>
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
				current_page = <FridgeList/>
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
