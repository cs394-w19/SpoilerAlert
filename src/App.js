import React, { Component } from 'react';
import './App.scss';
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
	toggleMenu() {
		this.setState({
			showMenu: !this.state.showMenu
		});
	}

	changePage(newPage) {
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

	constructor() {
    super();
    console.log("Here");
		this.state = {
			showMenu : false,
			page : PageEnum.FRIDGE,
			shoppingItems : shoppingData["shopping"]
		}
	}

	render() {
		let current_page = null;

		switch(this.state.page) {
			case PageEnum.FRIDGE:
				current_page = <FridgeList addShopItem={this.addShopItem}/>
				break;

			case PageEnum.SHOPPING:
				current_page = <ShoppingList items={this.state.shoppingItems}
											 addItem={this.addShopItem}
											 delItem={this.delShopItem}/>
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
