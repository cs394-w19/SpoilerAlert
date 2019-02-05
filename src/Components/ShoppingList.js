import React from 'react'
import ShoppingItem from './ShoppingItem'
import AddShoppingItem from './AddShoppingItem'
import AddItemFromShopping from './AddItemFromShopping'
import data from '../data/shopping.json'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


export default class ShoppingList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showAddItem: false,
			showToFridgePopup: false,
			item_to_delete: null,
			selectedItem: "",
			editingItem: false,
			item_to_edit: null
		};
		this.toggleAddItem = this.toggleAddItem.bind(this);
		this.toggleMoveToFridgePopup = this.toggleMoveToFridgePopup.bind(this);
		this.fillInput = this.fillInput.bind(this);
		this.toggleEditingItem = this.toggleEditingItem.bind(this);
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

	toggleEditingItem(item, toggle) {
		if (toggle === true)
		{
			this.setState({
				item_to_edit: item,
				editingItem: true
			});
		}
		else
		{
			this.setState({
				item_to_edit: null,
				editingItem: false
			});
		}
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
						delItem={this.props.delItem}
						toggleEditingItem={this.toggleEditingItem}
						editingItem={this.state.editingItem}
						item_to_edit={this.state.item_to_edit}></ShoppingItem>
			</>
			)
		);

	return (
		<div className="center">		
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

			<Fab className="addButton" onClick={this.toggleAddItem} 
				style={{backgroundColor: 'white', position: 'absolute', right: '0', bottom: '0', margin: '1em'}}>
              <AddIcon />
            </Fab>
		</div>
		)
	}
}
