import React from 'react';

export default class AddFridgeItem extends React.Component{
  add_and_close = (name, days) => {
    if (name !== "" && days !== "") {
      this.props.addItem(name, parseInt(days, 10));
    }
    this.props.closePopup();
    return
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_inner"> 
          <div className="title">Add to Fridge</div>
          <br />
          <div>Food Name: <input type="text" value={this.props.inputValue} onChange={this.handleChange} id="fridge_item_name"/></div>
          <br />
          <div>Days Til Expiration:
            <input type="number" min="1" id="days_til"/>
          </div>
          <br />
          <button className="popup_button left" onClick={() => this.add_and_close(document.getElementById('fridge_item_name').value, document.getElementById('days_til').value)}>
            Done
            </button>
	        <button className="popup_button right" onClick={this.props.closePopup}>Cancel</button>
        </div>
      </div>

		)
	}
}
