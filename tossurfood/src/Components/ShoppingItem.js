import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

export default class ShoppingItem extends React.Component{
	render() {
    return (
            <ListItem>
                <ListItemText primary={this.props.item}/>
                <ListItemSecondaryAction>
		              <i className="material-icons">
			              delete
              		</i>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}
