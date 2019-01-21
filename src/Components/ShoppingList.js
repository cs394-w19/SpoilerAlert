import React from 'react';
import ShoppingItem from './ShoppingItem';
import AddShoppingItem from './AddShoppingItem';
import data from '../data/shopping.json';
import Button from '@material-ui/core/Button';

export default class ShoppingList extends React.Component{
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
		const productList = myFood.map(product => (
			<ShoppingItem item={product} delItem={this.props.delItem}></ShoppingItem>
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
			<Button></Button>
		</div>
		)
	}
}
