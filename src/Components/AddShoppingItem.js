import React from 'react';

export default class AddShoppingItem extends React.Component{
  
  add_and_close = (name) => {
    if (name !== "") {
      this.props.addItem(name);
      this.props.closePopup();
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
          <div className="title">Add to Shopping List</div>
          <br />
          <div>Food Name: <input type="text" defaultValue={this.props.inputValue} id="food_name"/></div>
          <br />
          <button className="popup_button left" onClick={() => this.add_and_close(document.getElementById('food_name').value)}>
          Done
          </button>
          <button className="popup_button right" onClick={this.props.closePopup}>
          Cancel
          </button>
        </div>
      </div>
		)
	}
}
