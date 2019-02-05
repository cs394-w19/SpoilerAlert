import React from 'react';
import FridgeItem from './FridgeItem'
import AddFridgeItem from './AddFridgeItem';
import AddShoppingItem from './AddShoppingItem.js'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default class FridgeList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showAddItem: false,
			showToShoppingPopup: false,
			item_to_delete: null,
			selectedItem: "",
			editingItem: false,
			item_to_edit: null
		};
		this.toggleAddItem = this.toggleAddItem.bind(this);
		this.toggleMoveToShoppingPopup = this.toggleMoveToShoppingPopup.bind(this);
		this.fillInput = this.fillInput.bind(this);
		this.toggleEditingItem = this.toggleEditingItem.bind(this);

		this.fab = [
			{
				color: 'white',
				className: 'addButton',
				icon: <AddIcon />,
			},
		];

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
					fillInput={this.fillInput}
					delItem={this.props.delItem}
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

			<Fab className="addButton" onClick={this.toggleAddItem} 
				style={{backgroundColor: 'white', position: 'absolute', right: '0', bottom: '0', margin: '1em'}}>
              <AddIcon />
            </Fab>
		  </div>
		)
	}
}
