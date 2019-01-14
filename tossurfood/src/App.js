import React, { Component } from 'react';
import './App.css';
import FridgeList from './Components/FridgeList.js'
import ShoppingList from './Components/ShoppingList.js'
import Settings from './Components/Settings.js'
import Menu from './Components/Menu.js'


const PageEnum = {
	FRIDGE : 1,
	SHOPPING : 2,
	SETTINGS : 3,
}

class App extends Component {
  toggleMenu() {
		this.setState({
			showMenu: !this.state.showMenu
		});
	}

  changePage(newPage) {
		this.setState({
			page: newPage
		});
		if (this.state.showMenu)
		  this.toggleMenu();
	}

  constructor() {
  	super();
  	this.state = {
  		showMenu : false,
  		page : PageEnum.FRIDGE
  	}
  }

  render() {
  	let current_page = null;

  	switch(this.state.page) {
  		case PageEnum.FRIDGE:
      	current_page = <FridgeList/>
      	break;

    	  case PageEnum.SHOPPING:
    	    current_page = <ShoppingList/>
    	    break;

        case PageEnum.SETTINGS:
          current_page = <Settings/>
          break;

    	  default:
    	    current_page = <FridgeList/>
  	}
    return (
      <div>
        <Menu enum={PageEnum} 
              toggleMenu={i => this.toggleMenu(i)} 
              changePage={i => this.changePage(i)}
              state={this.state.showMenu}/>
        {current_page}
      </div>
      
    );
  }
}

export default App;