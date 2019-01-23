import React from 'react';
import FridgeItem from './FridgeItem'
import AddFridgeItem from './AddFridgeItem';
import DelConfirm from './DelConfirm.js'

export default class FridgeList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showAddItem: false,
			showDelConfirm: false,
			item_to_delete: null,
		};
		this.toggleAddItem = this.toggleAddItem.bind(this);
		this.toggleDelConfirm = this.toggleDelConfirm.bind(this);
	}
	
	toggleAddItem() {
		this.setState({
			showAddItem: !this.state.showAddItem
		});
	}

	toggleDelConfirm(item) {
		this.setState({
			showDelConfirm: !this.state.showDelConfirm,
			item_to_delete: item
		});
	}

	render() {
		const productList = Object.entries(this.props.items).map(([product, date]) => (
	    <FridgeItem item={product}
	    			date={date}
	    			toggleDelConfirm={this.toggleDelConfirm}></FridgeItem>
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
	          {this.state.showDelConfirm ?
				  <DelConfirm closePopup={this.toggleDelConfirm.bind(this)}
							  delItem={this.props.delItem}
							  item={this.state.item_to_delete} />
				  : null
			  }
	        <button onClick = {this.props.checkExpiry}> Add Expired Items to Shopping </button>
	      </div>
		)
	}
}
