import React from 'react';
import ShoppingItem from './ShoppingItem';
import AddShoppingItem from './AddShoppingItem';
import '../App.scss';
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
		let items_copy = this.state.items;
		items_copy.push(item_name);
		this.setState({items: items_copy});
	  }

	delShopItem = (item) => {
		let items_copy = this.state.items;
		//console.log(array);
		var index = items_copy.indexOf(item)
		//console.log(item);
		if (index !== -1) {
			items_copy.splice(index, 1);
			console.log(items_copy);
			this.setState({items: items_copy});
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
	     
	      {this.state.showAddItem ? 
            <AddShoppingItem closePopup={this.togglePopup.bind(this)} addItem={this.addItem} />
			: null
			}
		</div>
		)
	}
}
