import React from 'react'
import ShoppingItem from './ShoppingItem'
import AddShoppingItem from './AddShoppingItem'
import AddItemFromShopping from './AddItemFromShopping'
import DelConfirm from './DelFromShoppingConfirm.js'
import data from '../data/shopping.json'
import Button from '@material-ui/core/Button'


export default class ShoppingList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showAddItem: false,
			showToFridgePopup: false,
			showDelConfirm: false,
			item_to_delete: null,
			selectedItem: "",
		};
		this.toggleAddItem = this.toggleAddItem.bind(this);
		this.toggleMoveToFridgePopup = this.toggleMoveToFridgePopup.bind(this);
		this.toggleDelConfirm = this.toggleDelConfirm.bind(this);
		this.fillInput = this.fillInput.bind(this);
	}	
	
	toggleAddItem() {
		this.setState({
			showAddItem: !this.state.showAddItem,
		});
	}

	toggleMoveToFridgePopup() {
		this.setState({
			showToFridgePopup: !this.state.showToFridgePopup
		});
	}

	toggleDelConfirm(item) {
		this.setState({
			showDelConfirm: !this.state.showDelConfirm,
			item_to_delete: item
		});
	}

	fillInput(name) {
		//gets the name of selected item and auto-fills the add item form
		this.setState({
			selectedItem: name,
		})
		this.toggleMoveToFridgePopup();
	}

	handleChange(event) {
	    this.setState({
	    	selectedItem: event.target.value
	    });
	  }

	render() {
		const myFood = this.props.items;
		const productList = myFood.map(product => (
			<>
			<ShoppingItem item={product} 
						fillInput={this.fillInput}
						addToFridge={this.props.addToFridge}
						editItem={this.props.editItem}
						toggleDelConfirm={this.toggleDelConfirm}></ShoppingItem><br/>
			</>
			)
		);

	return (
		<div className="center"> Shopping List 
			<i className="material-icons add-button" onClick={this.toggleAddItem.bind(this)}>
			  add_box
		 	</i>		
		 	<div>{productList}</div>
		 
			{this.state.showAddItem ? 
				<AddShoppingItem closePopup={this.toggleAddItem.bind(this)}
								 addItem={this.props.addItem} />
				: null
			}
			{this.state.showToFridgePopup ? 
				<AddItemFromShopping inputValue={this.state.selectedItem} 
									closePopup={this.toggleMoveToFridgePopup.bind(this)} 
									addItem={this.props.addToFridge}
									handleChange={this.handleChange} />
				: null
			}

			{this.state.showDelConfirm ?
				<DelConfirm closePopup={this.toggleDelConfirm.bind(this)}
							delItem={this.props.delItem}
							item={this.state.item_to_delete} />
				: null
			}
		</div>
		)
	}
}
