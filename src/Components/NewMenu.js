import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu'

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
        <Button onClick={this.toggleDrawer('left', true)}><MenuIcon/></Button>
        <Drawer anchor="left" open={this.state.left} onClose={this.toggleDrawer('left', false)}>
              <div onClick={this.toggleDrawer('left', false)}>
                <div><Button className="menubutton" onClick={() => this.props.changePage(this.props.enum.FRIDGE)}>Fridge List</Button></div>
                <div><Button className="menubutton" onClick={() => this.props.changePage(this.props.enum.SHOPPING)}>Shopping List</Button></div>
                <div><Button className="menubutton" onClick={() => this.props.changePage(this.props.enum.SETTINGS)}>Settings</Button></div>
              </div>
            </Drawer>
          </div>
    )
  }
}
