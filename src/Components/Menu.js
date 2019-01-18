import React	from 'react';

export default class Menu extends React.Component{
	
	render() {
    return (
				<>
        <div> 
					<i onClick={() => this.props.toggleMenu()} className="material-icons">
					menu
	      	</i>
        </div>
        {this.props.state ? 
				<div className="menu">
					<div><button className="menubutton" onClick={() => this.props.changePage(this.props.enum.FRIDGE)}>Fridge List</button></div>
	  	    		<div><button className="menubutton" onClick={() => this.props.changePage(this.props.enum.SHOPPING)}>Shopping List</button></div>
		    		<div><button className="menubutton" onClick={() => this.props.changePage(this.props.enum.SETTINGS)}>Settings</button></div>
				</div> 	
				: null
        }	
				</>
		)
	}
}
