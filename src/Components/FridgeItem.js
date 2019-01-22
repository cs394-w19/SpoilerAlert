import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';

//item name, days until expiration

export default class FridgeItem extends React.Component{
    prettyDate(date) {
        if (date === 1)
        {
            return String(date) + " day until expiration date";
        }
        else
        {
            return String(date) + " days until expiration date";
        }
    }

    render() {

      let item_class = "list-item";
      if (this.props.date <= 0){
        item_class = "list-item yellow";
      }
      return (
            <ListItem class={item_class}>
                <ListItemText primary={this.props.item} secondary={this.prettyDate(this.props.date)} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => this.props.delFridgeItem(this.props.item)}>
                    <DeleteIcon/>
		              </IconButton>
                </ListItemSecondaryAction>
            </ListItem>

        )
    }
}
