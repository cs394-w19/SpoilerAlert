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
  changePage(newPage) {
		this.setState({
			page: newPage
		});
	}

  constructor() {
  	super();

  	this.state = {
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
        <Menu enum={PageEnum} pageChange={this.changePage}/>
        {current_page}
      </div>
      
    );
  }
}

export default App;