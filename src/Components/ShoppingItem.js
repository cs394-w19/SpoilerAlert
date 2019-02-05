import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import FridgeIcon from '@material-ui/icons/Kitchen';



export default class ShoppingItem extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showEdit: false
		};
		this.toggleEdit = this.toggleEdit.bind(this);
		this.edit_and_close = this.edit_and_close.bind(this);
	}

	edit_and_close(old_item, new_item) {
		this.props.editItem(old_item, new_item);
		this.toggleEdit();
	}

	toggleEdit() {
		if (!this.props.editingItem)
		{
			this.setState({
				showEdit: true
			});
			this.props.toggleEditingItem(this.props.item, true);
		}
		else if (this.props.item === this.props.item_to_edit)
		{
			this.setState({
				showEdit: false
			});
			this.props.toggleEditingItem(this.props.item, false);
		}
	}

	render() {

	let item_class = "list-item-shopping";
		
	return (
		<>
		{!this.state.showEdit ?
			<ListItem className={item_class} onClick={this.toggleEdit}>
				<ListItemText primary={this.props.item}/>
				<ListItemSecondaryAction>
					<IconButton onClick={() => this.props.delItem(this.props.item, true)}>
						<DeleteIcon />
					</IconButton>
					<IconButton onClick={() => this.props.fillInput(this.props.item)}>
						<FridgeIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
			:
			<><br/>
            <form>
            	Item: <input type="text" id="shopping_edit_item" defaultValue={this.props.item}/>
            </form><br/>
            <button className="popup_button left" onClick={() => this.edit_and_close(this.props.item, document.getElementById("shopping_edit_item").value)}>Done</button>
            <button className="popup_button right" onClick={this.toggleEdit}>Cancel</button>
            </>
		}
		</>
		)
	}
}
