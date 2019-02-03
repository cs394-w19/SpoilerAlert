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
    else if (quantity <= 0)
    {
      alert("Please enter a quantity greater than 0");
    }
    else
    {
      alert("Please fill in all the required fields");
    }
    
    return
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_inner"> 
          <div className="title">Add to Fridge</div>
          <br />
          <div>Food Name: <input type="text" id="food_name"/></div>
          <br />
          <div>Quantity: <input type="number" id="quantity"/></div>
          <br />
          <div>Expiration Date:
            <input type="date" id="expiration"/>
          </div>
          <br />
          <button className="popup_button left" onClick={() => this.add_and_close(document.getElementById('food_name').value, document.getElementById('quantity').value, document.getElementById('expiration').value)}>
            Done
            </button>
	        <button className="popup_button right" onClick={this.props.closePopup}>Cancel</button>
        </div>
      </div>

		)
	}
}
