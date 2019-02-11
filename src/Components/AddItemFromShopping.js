import React from 'react';

export default class AddFridgeItem extends React.Component{
  add_and_close = (name, quantity, date) => {
    if (name !== "" && date !== "" && String(quantity) !== "") {
      const one_day = 1000*60*60*24;
      let curr_date = new Date();
      let future_date = new Date(date);
      let curr_date_ms = curr_date.getTime();
      let future_date_ms = future_date.getTime();
      let difference_ms = future_date_ms - curr_date_ms;
      let days = Math.ceil(difference_ms/one_day);
      this.props.addItem(name, quantity, days);
      
      this.props.closePopup();
    }
    
    return
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_inner"> 
          <div className="title">Add to Fridge</div>
          <br />
          <div>Food Name: <input type="text" defaultValue={this.props.inputValue} onChange={this.handleChange} id="fridge_item_name" disabled/></div>
          <br />
          <div>Quantity: <input type="text" id="quantity"/></div>
          <br />
          <div>Expiration Date:
            <input type="date" id="date"/>
          </div>
          <br />
          <button className="popup_button left" onClick={() => this.add_and_close(document.getElementById('fridge_item_name').value, document.getElementById('quantity').value, document.getElementById('date').value)}>
            Done
            </button>
	        <button className="popup_button right" onClick={this.props.closePopup}>Cancel</button>
        </div>
      </div>

		)
	}
}
