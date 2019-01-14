import React from 'react';

export default class AddShoppingItem extends React.Component{
  
  render() {
    return (
      <div> Add to list
        <button onClick={this.props.closePopup}>Done</button>
      </div>
		)
	}
}
