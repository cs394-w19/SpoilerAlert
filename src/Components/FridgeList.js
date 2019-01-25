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
		};
		this.toggleAddItem = this.toggleAddItem.bind(this);
		this.toggleMoveToShoppingPopup = this.toggleMoveToShoppingPopup.bind(this);
		this.toggleDelConfirm = this.toggleDelConfirm.bind(this);
		this.fillInput = this.fillInput.bind(this);
	}	
	
	toggleAddItem() {
		this.setState({
			showAddItem: !this.state.showAddItem
		});
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

	handleChange(event) {
		this.setState({
			selectedItem: event.target.value
		});
	  }



	render() {
		console.log(this.props.items);
		const productList = Object.entries(this.props.items).map(([product, data]) => (
		<>
		<FridgeItem item={product}
					quantity={data[0]}
					date={data[1]}
					toggleDelConfirm={this.toggleDelConfirm}
					fillInput={this.fillInput}
					editItem={this.props.editItem}
					></FridgeItem><br/>
		</>
			)
		);

		return (
		  <div className="center"> Fridge List
			<i className="material-icons add-button" onClick={this.toggleAddItem.bind(this)}>
				add_box
			</i>
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
								handleChange={this.handleChange} 
								/>
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
