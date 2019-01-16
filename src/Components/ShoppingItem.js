import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';

export default class ShoppingItem extends React.Component{
	render() {
    return (
            <ListItem>
                <ListItemText primary={this.props.item}/>
                <ListItemSecondaryAction>
                    <IconButton onClick={() => this.props.func(this.props.item)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}
