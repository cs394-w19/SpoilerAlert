import React, { Component } from 'react';


export default class Menu extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showMenu: false
		};
	}
	
	togglePopup() {
		this.setState({
			showMenu: !this.state.showMenu
		});
	}

	render() {
    return (
	    <>
        <div> 
	        <i onClick = {this.togglePopup.bind(this)} className="material-icons">
		        menu
	        </i>
        </div>
        {this.state.showMenu ? 
          <div>
	  	    <div><button onClick={this.togglePopup.bind(this)}>Shopping List</button></div>
		    <div><button onClick={this.togglePopup.bind(this)}>Fridge List</button></div>
		    <div><button onClick={this.togglePopup.bind(this)}>Settings</button></div>
 	      </div> 	
          : null
        }	
	    </>
		)
	}
}