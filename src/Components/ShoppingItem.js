import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import CartPlusIcon from '@material-ui/icons/AddShoppingCart'



export default class ShoppingItem extends React.Component{
	
	render() {
		
	return (
			<ListItem>
				<ListItemText primary={this.props.item}/>
				<ListItemSecondaryAction>
					<IconButton onClick={() => this.props.delItem(this.props.item)}>
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
