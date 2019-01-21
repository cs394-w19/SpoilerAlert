import React from 'react';
import FridgeItem from './FridgeItem'
import AddFridgeItem from './AddFridgeItem';
import data from '../data/fridge.json'

export default class FridgeList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showAddItem: false,
		};
	}
	
	togglePopup() {
		this.setState({
			showAddItem: !this.state.showAddItem
		});
	}


    

  	

	render() {
		const myFood = this.props.items;
		const productList = Object.entries(this.props.items).map(([product, date]) => (
	    <FridgeItem item={product} date={date} delFridgeItem={i => this.delItem(i)}></FridgeItem>
			)
		);

	    return (
	      <div className="center"> Fridge List
		      <i className="material-icons add-button" onClick={this.togglePopup.bind(this)}>
			      add_box
		      </i>
					<div >{productList}</div>
		      {this.state.showAddItem ? 
	          <AddFridgeItem closePopup={this.togglePopup.bind(this)} addItem={this.props.addItem}/>
	          : null
	        }
	        <button onClick = {this.props.checkExpiry}> Add Expired Items to Shopping </button>
	      </div>
		)
	}
}
