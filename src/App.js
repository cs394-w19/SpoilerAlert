import React, { Component } from 'react';
import './App.css';
import FridgeList from './Components/FridgeList.js';
import ShoppingList from './Components/ShoppingList.js';
import Settings from './Components/Settings.js';
import HomePage from './Components/HomePage.js';
import NewMenu from './Components/NewMenu.js';
import NavBar from './Components/NavBar.js';
import SnaccBar from './Components/SnaccBar.js';
import firebase from "firebase";
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { timingSafeEqual } from 'crypto';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
  fontFamily: "ABeeZee",
  }
});

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
	HOME: 4
}

const SnaccEnum = {
	NONE : 0,
	DELFRIDGE : 1,
	DELSHOP : 2,
	FRIDGETOSHOP : 3,
	SHOPTOFRIDGE : 4,
}

class App extends Component {
	constructor() {
		super();
		firebase.auth().signOut();
		/*
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
		*/
		this.state = {
			showMenu : false,
			page : PageEnum.HOME,
			shoppingItems : [],
      		fridgeItems: {},
			userID: "",
      		showSnaccBar: false,
      		snacc_type: SnaccEnum.NONE,
      		snacc_item: null,
      		snacc_quantity: null,
      		snacc_expiration: null
		};
	}
/*
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResults: () => false
    }
  };
*/

  componentDidMount = () => {
	firebase.auth().onAuthStateChanged(user => {
		let self = this;

		this.setState({
			userID : user ? user.uid : ""
		})
		if (user) {
			let fridgePath = user.uid + '/fridge';
			let shoppingPath = user.uid + '/shopping';
			firebase.database().ref(fridgePath).once('value', function(snapshot) {
				if (snapshot === null) {
					self.setState({ page: PageEnum.FRIDGE});
				}
				else {
					let fridgeBuf = {}; 
					firebase.database().ref(fridgePath).orderByChild('1').once('value', function(snapshot) {
						snapshot.forEach((child) => {
							fridgeBuf[child.key] = child.val();
							self.setState({page : PageEnum.FRIDGE});
						})
						self.setState({ fridgeItems : fridgeBuf});
					});
		
					let shoppingBuf = [];
					firebase.database().ref(shoppingPath).once('value', function(snapshot) {
						snapshot.forEach((child) => {
							shoppingBuf.push(child.val());
						})

						self.setState({ shoppingItems : shoppingBuf});
					});
				}
			});
		}
		else {
			self.setState({ 
				fridgeItems : {},
				shoppingItems : [],
				page: PageEnum.HOME
			});
		}
	});
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
			
			let shoppingRef = firebase.database().ref(this.state.userID + '/shopping');
			let writeLoc = shoppingRef.push();
			writeLoc.set(item_name);
		}
	}

	delShopItem = (item, showSnacc) => {
		this.setState({
			snacc_item: item
		});

		let items_copy = this.state.shoppingItems;
		let index = items_copy.indexOf(item)
		if (index !== -1) {
			items_copy.splice(index, 1);
			this.setState({shoppingItems: items_copy});
		}

		let shoppingRef = firebase.database().ref(this.state.userID + '/shopping');
		shoppingRef.orderByValue().equalTo(item).once('child_added', function(snapshot) {
			snapshot.ref.remove();
		})

		if (showSnacc)
			this.toggleSnaccBar(SnaccEnum.DELSHOP, this.state.snacc_item);
	}

	shoppingToFridge = (item_name, quantity, days_til) => {
		this.setState({
			snacc_item: item_name,
			snacc_quantity: quantity,
		});

		this.delShopItem(item_name, false);
		this.addFridgeItem(item_name, quantity, days_til);
			
		this.toggleSnaccBar(SnaccEnum.SHOPTOFRIDGE, this.state.snacc_item);
	}

	editShoppingItem = (old_item, new_item) => {
		if (old_item !== new_item) {
			let new_items = this.state.shoppingItems.slice();
			let index = new_items.indexOf(old_item);
			new_items[index] = new_item;
			this.setState({shoppingItems : new_items});

			let shoppingRef = firebase.database().ref(this.state.userID + '/shopping');
			shoppingRef.orderByValue().equalTo(old_item).once('child_added', function(snapshot) {
				snapshot.ref.set(new_item);
			})
		}
	}

	editFridgeItem = (old_item, new_item, new_quantity, new_days_til) => {
		if (new_quantity <= 0)
		{
			this.delFridgeItem(old_item, false);
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
			firebase.database().ref(this.state.userID + '/fridge').child(old_item).update([new_quantity, old_days_til]);
		}
		else {
			this.delFridgeItem(old_item, false);
			this.addFridgeItem(new_item, new_quantity, new_days_til);
		}
	}

	fridgeToShopping = (item_name) => {
		let data = this.state.fridgeItems[item_name];

		this.setState({
			snacc_item: item_name,
			snacc_quantity: data[0],
			snacc_expiration: data[1]
		});

		this.addShopItem(item_name);
		this.delFridgeItem(item_name, false);

		this.toggleSnaccBar(SnaccEnum.FRIDGETOSHOP, this.state.snacc_item);
	}

	delFridgeItem = (item, showSnacc) => {
		let items_copy = this.state.fridgeItems;
		let data = items_copy[item];
		let item_quantity = data[0];
		let item_date = data[1];

		this.setState({
			snacc_item: item,
			snacc_quantity: item_quantity,
			snacc_expiration: item_date
		});

		delete items_copy[item];
		firebase.database().ref(this.state.userID + '/fridge').child(item).remove();

		this.setState({
			fridgeItems: items_copy,
		});

		if (showSnacc)
			this.toggleSnaccBar(SnaccEnum.DELFRIDGE, this.state.snacc_item, this.state.snacc_quantity, this.state.snacc_expiration);
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

		firebase.database().ref(this.state.userID + '/fridge').update({
			[item_name] : [new_quantity, new_days_til]});
  	}

  	checkExpiry = () => {
  		var expired_items = [];
  		for (const [key, value] of Object.entries(this.state.fridgeItems)) {
		  if(value <= 0)
		  	expired_items.push(key);
		};
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
					this.delFridgeItem(Object.keys(this.state.fridgeItems)[j], false);
			}
		}
  	}

  	toggleSnaccBar = (type, item, quantity, expiration) => {
  		this.setState({
  			snacc_type: type,
  			showSnaccBar: !this.state.showSnaccBar
  		});
  	}

  	snaccUndo = () => {
  		switch(this.state.snacc_type) {
  			case SnaccEnum.DELFRIDGE:
  				this.addFridgeItem(this.state.snacc_item, this.state.snacc_quantity, this.state.snacc_expiration);
  				break;

			case SnaccEnum.DELSHOP:
				this.addShopItem(this.state.snacc_item);
				break;

			case SnaccEnum.FRIDGETOSHOP:
				this.delShopItem(this.state.snacc_item, false);
				this.addFridgeItem(this.state.snacc_item, this.state.snacc_quantity, this.state.snacc_expiration);
				break;

			case SnaccEnum.SHOPTOFRIDGE:
				this.delFridgeItem(this.state.snacc_item, false);
				this.addShopItem(this.state.snacc_item);
				break;
  		}

  		this.setState({
  			showSnaccBar: !this.state.showSnaccBar
  		});
  	}

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

			case PageEnum.HOME:
				current_page = <HomePage/>
				break;

			default:
				current_page = <div>Oh no, something broke</div>
		}

		let current_snacc = null;

		switch(this.state.snacc_type) {
			case SnaccEnum.DELFRIDGE:
				current_snacc = <SnaccBar
									open={this.state.showSnaccBar}
									handleClose={() => this.toggleSnaccBar}
									snaccUndo={this.snaccUndo}
									message={String(this.state.snacc_quantity + ' ' + this.state.snacc_item + " removed from fridge")}
								/>
				break;

			case SnaccEnum.DELSHOP:
				current_snacc = <SnaccBar
									open={this.state.showSnaccBar}
									handleClose={() => this.toggleSnaccBar}
									snaccUndo={this.snaccUndo}
									message={String(this.state.snacc_item + " removed from shopping list")}
								/>
				break;

			case SnaccEnum.FRIDGETOSHOP:
				current_snacc = <SnaccBar
									open={this.state.showSnaccBar}
									handleClose={() => this.toggleSnaccBar}
									snaccUndo={this.snaccUndo}
									message={String(this.state.snacc_item + " moved to shopping list")}
								/>
				break;

			case SnaccEnum.SHOPTOFRIDGE:
				current_snacc = <SnaccBar
									open={this.state.showSnaccBar}
									handleClose={() => this.toggleSnaccBar}
									snaccUndo={this.snaccUndo}
									message={String(this.state.snacc_quantity + ' ' + this.state.snacc_item + " moved to fridge")}
								/>
				break;

			default:
				current_snacc = null;
		}
		
		return (
			this.state.userID ?
				<MuiThemeProvider theme={theme}>
			<div className="app">
			<NavBar className="navigation" 
					enum={PageEnum} 
					changePage={i => this.changePage(i)}></NavBar>
			<br/>

			{current_page}

			{this.state.showSnaccBar ?
				current_snacc
				:
				null
			}

			</div>
			</MuiThemeProvider>
				:
				current_page
			
		);
	}
}

export default withStyles(theme)(App);
