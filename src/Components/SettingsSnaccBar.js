import React from 'react'
import SnackBar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'

export default class SettingsSnaccBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: this.props.open,
		};
	}

	render() {
		return (
			<SnackBar
				open={this.state.open}
				onClose={this.props.handleClose(0)}
				message={<span>{this.props.message}</span>}
				autoHideDuration={4000}
				action={[
					<>
						<CloseIcon onClick={this.props.handleClose(0)}/>
					</>
				]}
			/>
		);
	}
}