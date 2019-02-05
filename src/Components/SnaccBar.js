import React from 'react'
import SnackBar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'

export default class SnaccBar extends React.Component {
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
						<Button key="undo" color="secondary" size="small" onClick={this.props.snaccUndo}>
							UNDO
						</Button>
						<CloseIcon onClick={this.props.handleClose(0)}/>
					</>
				]}
			/>
		);
	}
}