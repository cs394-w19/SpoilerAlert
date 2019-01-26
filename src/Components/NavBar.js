import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ListIcon from '@material-ui/icons/ListAltOutlined'
import FridgeIcon from '@material-ui/icons/Kitchen'
import SettingsIcon from '@material-ui/icons/SettingsOutlined'


export default class NavBar extends React.Component {
	state = {
		value: 0,
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

  render() {
	const { value } = this.state;

	return (
		<BottomNavigation
			value={value}
			onChange={this.handleChange}
			showLabels>
			<BottomNavigationAction label="Fridge" 
									onClick={() => this.props.changePage(this.props.enum.FRIDGE)} 
									icon={<FridgeIcon />} />
			<BottomNavigationAction label="Shopping List" 
									onClick={() => this.props.changePage(this.props.enum.SHOPPING)} 
									icon={<ListIcon />} />
			<BottomNavigationAction label="Settings" 
									onClick={() => this.props.changePage(this.props.enum.SETTINGS)}
									icon={<SettingsIcon />} />
		</BottomNavigation>
	);
  }
} 