import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/Menu'
import FridgeIcon from '@material-ui/icons/Kitchen'
import SettingsIcon from '@material-ui/icons/SettingsOutlined'
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
  	background: "#2EC4B6",
    color: "white",
    "&$selected": {
      color: "#FF9F1C"
    }
  },
  selected: {}
};

class NavBar extends React.Component {
	state = {
		value: 0,
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

  render() {
	const { value } = this.state;
	const actionClasses = this.props.classes;
	return (
    <BottomNavigation className="navbar"
			value={value}
			onChange={this.handleChange}
			showLabels>
			<BottomNavigationAction classes={actionClasses} label="Fridge" 
									onClick={() => this.props.changePage(this.props.enum.FRIDGE)} 
									icon={<FridgeIcon />} />
			<BottomNavigationAction classes={actionClasses} label="Shopping List" 
									onClick={() => this.props.changePage(this.props.enum.SHOPPING)} 
									icon={<ListIcon />} />
			<BottomNavigationAction classes={actionClasses} label="Settings" 
									onClick={() => this.props.changePage(this.props.enum.SETTINGS)}
									icon={<SettingsIcon />} />
		</BottomNavigation>
	);
  }
} 

export default withStyles(styles)(NavBar);