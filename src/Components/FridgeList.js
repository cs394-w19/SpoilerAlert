import React from 'react';
import FridgeItem from './FridgeItem'
import AddFridgeItem from './AddFridgeItem';
import data from '../data/fridge.json'

export default class FridgeList extends React.Component{
	constructor(props) {
		super(props);
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
    	Object.entries(this.state.items).map(([n, d]) => {
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
      		items: new_items
      	});
  	}

  	checkExpiry = () => {
  		let expired_items = [];
  		for (const [key, value] of Object.entries(this.state.items)) {
		  if(value <= 0)
		  	expired_items.push(key);
		};
		console.log(expired_items);
		if(expired_items.length === 1)
			alert(expired_items + " has expired.\nAdded to shopping list");
		else
			alert(expired_items + " have expired.\nAdded to shopping list");
		for (let i = 0; i < expired_items.length; i++)
		{
			this.props.addShopItem(expired_items[i]);
			for (let j = 0; j < Object.keys(this.state.items).length; j++)
			{
				if (Object.keys(this.state.items)[j] === expired_items[i])
					this.delFridgeItem(Object.keys(this.state.items)[j]);
			}
		}
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
	        <button onClick = {this.checkExpiry.bind(this)}> Add Expired Items to Shopping </button>
	      </div>
		)
	}
}
