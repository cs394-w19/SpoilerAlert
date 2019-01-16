import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

export default class TempDrawer extends React.Component {
  state = {
    left: false,
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  }

  render() {
    return(
      <div>
        <Button onClick={this.toggleDrawer('left', true)}>Menu</Button>
        <Drawer anchor="left" open={this.state.left} onClose={this.toggleDrawer('left', false)}>
              <div >
                <div><Button className="menubutton" onClick={() => this.props.changePage(this.props.enum.FRIDGE)}>Fridge List</Button></div>
                <div><Button className="menubutton" onClick={() => this.props.changePage(this.props.enum.SHOPPING)}>Shopping List</Button></div>
                <div><Button className="menubutton" onClick={() => this.props.changePage(this.props.enum.SETTINGS)}>Settings</Button></div>
              </div>
            </Drawer>
          </div>
    )
  }
}
