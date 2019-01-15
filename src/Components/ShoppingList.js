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
			items: data
		};
	}	
	
	togglePopup() {
		this.setState({
			showAddItem: !this.state.showAddItem
		});
	}

	render() {
		const myFood = data["shopping"];
		const productList = myFood.map(product => (
			<ShoppingItem item={product}></ShoppingItem>
			)
		);

    return (
		<div className="center"> Shopping List 
		  <i className="material-icons add-button" onClick={this.togglePopup.bind(this)}>
		      add_box
	      </i>		
	      <div>{productList}</div>
	      <button>Add entire Fridge List</button>
	      {this.state.showAddItem ? 
            <AddShoppingItem closePopup={this.togglePopup.bind(this)} />
			: null
			}
		</div>
		)
	}
}
