import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import CartPlusIcon from '@material-ui/icons/AddShoppingCart'


export default class ShoppingItem extends React.Component{
	
	delete_confirm = (item) => {
		this.props.toggleDelConfirm(item);
	}

	render() {

	let item_class = "list-item";
		
	return (
			<ListItem className={item_class}>
				<ListItemText primary={this.props.item}/>
				<ListItemSecondaryAction>
					<IconButton onClick={() => this.delete_confirm(this.props.item)}>
						<DeleteIcon />
					</IconButton>
					<IconButton onClick={() => this.props.fillInput(this.props.item)}>
						<CartPlusIcon />
					</IconButton>
			
				</ListItemSecondaryAction>
			</ListItem>
		)
	}
}
