import React from 'react'

export default class DelConfirm extends React.Component {
	del_and_close = (item, quantity) => {
    if(String(quantity).length > 0 ) {
  		this.props.delItem(item, quantity);
  		this.props.closePopup();
    }
	}

	render() {
    return (
      <div className="popup">
        <div className="popup_inner"> 
          <div className="title">Delete how many {this.props.item}?</div>
          <br />
          <div>Quantity: <input type="number" id="quantity"/></div>
          <br />
          <button className="popup_button left" onClick={() => this.del_and_close(this.props.item, document.getElementById('quantity').value)}>
            Ok
            </button>
	        <button className="popup_button right" onClick={this.props.closePopup}>Cancel</button>
        </div>
      </div>
		)
	}
}