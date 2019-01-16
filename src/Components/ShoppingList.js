import React from 'react';
import ShoppingItem from './ShoppingItem';
import AddShoppingItem from './AddShoppingItem';
import '../App.css';
import data from '../data/shopping.json';

export default class ShoppingList extends React.Component{
	constructor() {
		super();
		this.state = {
			showAddItem: false,
			items: data["shopping"] //array of food
		};
	}	
	
	togglePopup() {
		this.setState({
			showAddItem: !this.state.showAddItem
		});
	}

	addItem = (item_name) => {
		let new_items = [...this.state.items];
		new_items.push(item_name);
	
		this.setState({
		  items: new_items
		  });
	  }

	delShopItem = (item) => {
		var array = [...this.state.items];
		//console.log(array);
		var index = array.indexOf(item)
		//console.log(item);
		if (index !== -1) {
			array.splice(index, 1);
			//console.log(array);
			this.setState({items: array});
		}
	}

	render() {
		const myFood = this.state.items;
		const productList = myFood.map(product => (
			<ShoppingItem item={product} func={this.delShopItem}></ShoppingItem>
			)
		);

    return (
		<div className="center"> Shopping List 
		  <i className="material-icons add-button" onClick={this.togglePopup.bind(this)}>
		      add_box
	      </i>		
	      <div>{productList}</div>
	      <button className="list-modify-button">Add entire Fridge List</button>
	      {this.state.showAddItem ? 
            <AddShoppingItem closePopup={this.togglePopup.bind(this)} addItem={this.addItem} />
			: null
			}
		</div>
		)
	}
}
