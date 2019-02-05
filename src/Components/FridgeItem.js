import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import ListAddIcon from '@material-ui/icons/PlaylistAdd';

//item name, days until expiration

export default class FridgeItem extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showEdit: false
		};
		this.toggleEdit = this.toggleEdit.bind(this);
		this.edit_and_close = this.edit_and_close.bind(this);
	}

    prettyDate(date) {
        if (date === 0)
        {
            return "Expires today";
        }
        else if (date === -1)
        {
            return "Expired " + String(Math.abs(date)) + " day ago"
        }
        else if (date < 0)
        {
            return "Expired " + String(Math.abs(date)) + " days ago"
        }
        else if (date === 1)
        {
            return "Expiring in " + String(date) + " day";
        }
        else
        {
            return "Expiring in " +  String(date) + " days";
        }
    }

    getDateFromDaysTil(days_til) {
    	let date = new Date();
    	date.setDate(date.getDate() + days_til);
    	let day = date.getDate();
    	if (day < 10)
    	{
    		day = '0' + day;
    	}
    	let month = date.getMonth() + 1;
    	if (month < 10)
    	{
    		month = '0' + month;
    	}
    	let year = date.getFullYear();
    	let new_date = year + '-' + month + '-' + day;
    	return new_date;
    }

    getDaysTilFromDate(date) {
    	const one_day = 1000*60*60*24;
		let curr_date = new Date();
		let future_date = new Date(date);
		let curr_date_ms = curr_date.getTime();
		let future_date_ms = future_date.getTime();
		let difference_ms = future_date_ms - curr_date_ms;
		let days = Math.ceil(difference_ms/one_day);
		return days;
    }

    prettyInfo(quantity, days_til) {
        return "Quantity: " + String(quantity) + ". " + this.prettyDate(days_til)
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

	edit_and_close(old_item, new_item, new_quantity, new_days_til) {
		this.props.editItem(old_item, new_item, new_quantity, new_days_til);
		this.toggleEdit();
	}

    render() {

      let item_class = "list-item-fridge white";
      if (this.props.date <= 0){
        item_class = "list-item-fridge yellow";
      }
      return (
      	<>
  		{!this.state.showEdit ?
            <ListItem className={item_class} onClick={this.toggleEdit}>
                <ListItemText primary={this.props.item} secondary={this.prettyInfo(this.props.quantity, this.props.date)} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => this.props.delItem(this.props.item, true)}>
                    <DeleteIcon/>
		              </IconButton>
                  <IconButton >
                    <ListAddIcon onClick={() => this.props.fillInput(this.props.item)}/>
                  </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        	:
        	<><br/>
            <form>
            	Item: <input type="text" id="edit_fridge_item" defaultValue={this.props.item}/>
            </form><br/>
            <form>
            	Quantity: <input type="number" id="edit_fridge_quantity" defaultValue={this.props.quantity}/>
            </form><br/>
            <form>
            	Expiration Date: <input type="date" id="edit_fridge_date" defaultValue={this.getDateFromDaysTil(this.props.date)}/>
            </form><br/>
            <button className="popup_button left" onClick={() => this.edit_and_close(this.props.item, document.getElementById("edit_fridge_item").value, document.getElementById("edit_fridge_quantity").value, this.getDaysTilFromDate(document.getElementById("edit_fridge_date").value))}>Done</button>
            <button className="popup_button right" onClick={this.toggleEdit}>Cancel</button>
            <br/>
            </>
        }
	    </>
        )
    }
}
