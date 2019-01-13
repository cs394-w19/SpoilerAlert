import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import FridgeItem from './Components/FridgeItem';
import FridgeList from './Components/FridgeList'
import * as serviceWorker from './serviceWorker';
import ShoppingList from './Components/ShoppingList';
import Menu from './Components/Menu';
import Settings from './Components/Settings';

ReactDOM.render(
<html>
<head>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
</head>
<body>
<FridgeList/> 
</body>
</html>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
