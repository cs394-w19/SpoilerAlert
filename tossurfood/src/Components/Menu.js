import React, { Component } from 'react';


export default class Menu extends React.Component{

	render() {
    return (
	    <>
        <div> 
	        <i className="material-icons">
		        menu
	        </i>
        </div>
	      <div>
	  	    <div><button>Shopping List</button></div>
		      <div><button>Fridge List</button></div>
		      <div><button>Settings</button></div>
 	      </div> 		
	    </>
		)
	}
}