import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
//item name, days until expiration

export default class FridgeItem extends React.Component{
	render() {
        return(
            <ListItem>
                <ListItemText primary={this.props.item} secondary={this.props.date} />
                <ListItemSecondaryAction>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>

        )
    }
}




