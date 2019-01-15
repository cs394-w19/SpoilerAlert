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

	deleteItem = (item) => {
		let items_copy = [...this.state.items];
		delete items_copy[item];
		this.setState({
			items: items_copy
		})
	}

	render() {
		const myFood = this.state.items;
		const productList = Object.entries(myFood).map(([product, date]) => (
			<FridgeItem item={product} date={date} deleteItem={i => this.deleteItem(i)}></FridgeItem>
			)
		);

    return (
      <div className="center"> Fridge List
	      <i className="material-icons add-button" onClick={this.togglePopup.bind(this)}>
		      add_box
	      </i>
				<div >{productList}</div>
	      {this.state.showAddItem ? 
          <AddFridgeItem closePopup={this.togglePopup.bind(this)}/>
          : null
        }
        <button onClick = {() => alert("Milk is expired")}> Check for Expired Items </button>
      </div>
		)
	}
}
