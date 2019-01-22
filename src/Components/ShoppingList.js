import React from 'react';
import ShoppingItem from './ShoppingItem';
import AddShoppingItem from './AddShoppingItem';
import AddItemFromShopping from './AddItemFromShopping'
import data from '../data/shopping.json';
import Button from '@material-ui/core/Button';

export default class ShoppingList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showAddItem: false,
			selectedItem: "",
		};
		this.togglePopup = this.togglePopup.bind(this);
		this.fillInput = this.fillInput.bind(this);
	}	
	
	togglePopup() {
		this.setState({
			showAddItem: !this.state.showAddItem
		});
	}
	fillInput(name) {
		//gets the name of selected item and auto-fills the add item form
		this.setState({
			selectedItem: name,
		})
		this.togglePopup();
	}

	handleChange(event) {
	    this.setState({
	    	selectedItem: event.target.value
	    });
	  }

	render() {
		const myFood = this.props.items;
		const productList = myFood.map(product => (
			<ShoppingItem item={product} 
						fillInput={this.fillInput}
						togglePopup={this.togglePopup} 
						addToFridge={this.props.addToFridge} 
						delItem={this.props.delItem}></ShoppingItem>
			)
		);

	return (
		<div className="center"> Shopping List 
			<i className="material-icons add-button" onClick={this.togglePopup.bind(this)}>
			  add_box
		 	</i>		
		 	<div>{productList}</div>
		 
			{this.state.showAddItem ? 
				<AddShoppingItem closePopup={this.togglePopup.bind(this)} addItem={this.props.addItem} />
				: null
			}
			{this.state.showAddItem ? 
				<AddItemFromShopping inputValue={this.state.selectedItem} 
									closePopup={this.togglePopup.bind(this)} 
									addItem={this.props.addToFridge}
									handleChange={this.handleChange}/>
				: null
			}
			<Button></Button>
		</div>
		)
	}
}
