import React, { Component } from 'react';


export default class Menu extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
    return (
	    <>
        <div> 
	      <i onClick={() => this.props.toggleMenu()} className="material-icons">
		     menu
	      </i>
        </div>
        {this.props.state ? 
          <div>
            <div><button onClick={() => this.props.changePage(this.props.enum.FRIDGE)}>Fridge List</button></div>
	  	    <div><button onClick={() => this.props.changePage(this.props.enum.SHOPPING)}>Shopping List</button></div>
		    <div><button onClick={() => this.props.changePage(this.props.enum.SETTINGS)}>Settings</button></div>
 	      </div> 	
          : null
        }	
	    </>
		)
	}
}