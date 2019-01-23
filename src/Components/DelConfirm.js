import React from 'react'

export default class DelConfirm extends React.Component {
	del_and_close = (item) => {
		this.props.delItem(item);
		this.props.closePopup();
	}

	render() {
    return (
      <div className="popup">
        <div className="popup_inner"> 
          <div className="title">Remove {this.props.item}?</div>
          <br />
          <button className="popup_button left" onClick={() => this.del_and_close(this.props.item)}>
            Ok
            </button>
	        <button className="popup_button right" onClick={this.props.closePopup}>Cancel</button>
        </div>
      </div>
		)
	}
}