import React from 'react';
import FridgeItem from './FridgeItem'
import AddFridgeItem from './AddFridgeItem';
import data from '../data/fridge.json'

export default class FridgeList extends React.Component{
	constructor() {
		super();
		this.state = {
			showAddItem: false,
			items: data["fridge"]
		};
	}
	
	togglePopup() {
		this.setState({
			showAddItem: !this.state.showAddItem
		});
	}

	delFridgeItem = (item) => {
		let items_copy = this.state.items;
		delete items_copy[item];
    	this.setState({
    		items: items_copy
    	});
  	}

    addItem = (item_name, days_til) => {
    	let new_items = {};
    	let added = false;
    	if (Object.keys(this.state.items).length === 0) {
        		new_items[item_name] = days_til;
        		added = true;
      	}
      		
    	Object.entries(this.state.items).map(([n, d]) => {
      		if ((!added) && (d > days_til)) {
        		new_items[item_name] = days_til;
        		added = true;
      		}
      		new_items[n] = d;
      		return null //This is suppress a warning associated with map
    	});

    	this.setState({
      		items: new_items
      	});
  	}

	render() {
		const myFood = this.state.items;
		const productList = Object.entries(myFood).map(([product, date]) => (
	    <FridgeItem item={product} date={date} delFridgeItem={i => this.delFridgeItem(i)}></FridgeItem>
			)
		);

	    return (
	      <div className="center"> Fridge List
		      <i className="material-icons add-button" onClick={this.togglePopup.bind(this)}>
			      add_box
		      </i>
					<div >{productList}</div>
		      {this.state.showAddItem ? 
	          <AddFridgeItem closePopup={this.togglePopup.bind(this)} addItem={this.addItem}/>
	          : null
	        }
	        <button onClick = {() => alert("Milk is expired")}> Check for Expired Items </button>
	      </div>
		)
	}
}
