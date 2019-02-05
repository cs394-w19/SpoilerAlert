import React from 'react';
import FridgeItem from './FridgeItem'
import AddFridgeItem from './AddFridgeItem';
import DelConfirm from './DelFromFridgeConfirm.js'
import AddShoppingItem from './AddShoppingItem.js'

export default class FridgeList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showAddItem: false,
			showToShoppingPopup: false,
			showDelConfirm: false,
			item_to_delete: null,
			selectedItem: "",
			editingItem: false,
			item_to_edit: null
		};
		this.toggleAddItem = this.toggleAddItem.bind(this);
		this.toggleMoveToShoppingPopup = this.toggleMoveToShoppingPopup.bind(this);
		this.toggleDelConfirm = this.toggleDelConfirm.bind(this);
		this.fillInput = this.fillInput.bind(this);
		this.toggleEditingItem = this.toggleEditingItem.bind(this);
	}	
	
	toggleAddItem() {
		this.setState({
			showAddItem: !this.state.showAddItem
		});
		alert("yeehaw");
	}

	fillInput(name) {
		//gets the name of selected item and auto-fills the add item form
		this.setState({
			selectedItem: name,
		})
		this.toggleMoveToShoppingPopup();
	}

	toggleMoveToShoppingPopup() {
		this.setState({
			showToShoppingPopup: !this.state.showToShoppingPopup
		});
		console.log("toggle movetoshoppingpopup");
	}

	toggleDelConfirm(item) {
		this.setState({
			showDelConfirm: !this.state.showDelConfirm,
			item_to_delete: item
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

	handleChange(event) {
		this.setState({
			selectedItem: event.target.value
		});
	  }



	render() {
		const productList = Object.entries(this.props.items).map(([product, data]) => (
		<>
		<FridgeItem item={product}
					quantity={data[0]}
					date={data[1]}
					toggleDelConfirm={this.toggleDelConfirm}
					fillInput={this.fillInput}
					editItem={this.props.editItem}
					toggleEditingItem={this.toggleEditingItem}
					editingItem={this.state.editingItem}
					item_to_edit={this.state.item_to_edit}
					></FridgeItem>
		</>
			)
		);

		return (
		  <div className="center">
			
				<div >{productList}</div>
			{this.state.showAddItem ? 
				<AddFridgeItem closePopup={this.toggleAddItem.bind(this)}
							   addItem={this.props.addItem}/>
				: null
			}
			{this.state.showToShoppingPopup ? 
				<AddShoppingItem inputValue={this.state.selectedItem} 
								 closePopup={this.toggleMoveToShoppingPopup.bind(this)} 
								 addItem={this.props.toShopping}
								 handleChange={this.handleChange}/>
				: null
			}

			  {this.state.showDelConfirm ?
				  <DelConfirm closePopup={this.toggleDelConfirm.bind(this)}
							  delItem={this.props.delItem}
							  item={this.state.item_to_delete}
							  quantity={this.props.items[this.state.item_to_delete][0]}/>
				  : null
			}
			<i className="material-icons add-button" onClick={this.toggleAddItem.bind(this)}>
				add_box
			</i>
		  </div>
		)
	}
}
