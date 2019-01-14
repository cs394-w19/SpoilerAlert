import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

//item name, days until expiration

export default class FridgeItem extends React.Component{
	render() {
        return(
            <ListItem>
                <ListItemText primary={this.props.item} secondary={this.props.date} />
                <ListItemSecondaryAction>
		              <i className="material-icons">
			              delete
		              </i>
                </ListItemSecondaryAction>
            </ListItem>

        )
    }
}
