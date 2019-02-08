import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import Fridge from './data/logo.png'
import firebase from "firebase";
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { timingSafeEqual } from 'crypto';
import App from './App.js'



var config = {
	apiKey: "AIzaSyDAnOBtoL7VHdV-VYd2Tcr0FLv5elDaN8A",
	authDomain: "spoileralert-394.firebaseapp.com",
	databaseURL: "https://spoileralert-394.firebaseio.com",
	storageBucket: "spoileralert-394.appspot.com",
};
firebase.initializeApp(config);

/**styling**/
const divStyle = {
	textAlign: 'center',
	width: '100%'
}
const fridgeStyle = {
	marginTop: '50%',
	// marginLeft: '20%',
	height: '15em',
	display: 'inline-block'
}
/**********/

export default class HomePage extends React.Component {
	constructor() {
		super();
		this.state = {
			userID: "",
		};

	}
	uiConfig = {
		signInFlow: "popup",
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID
		],
		callbacks: {
			signInSuccessWithAuthResults: () => false
		}
	};
	componentDidMount = () => {
		firebase.auth().onAuthStateChanged(user => {
			let self = this;

			this.setState({
				userID : user ? user.uid : ""
			})
			if (user) {
				let fridgePath = user.uid + '/fridge';
				let shoppingPath = user.uid + '/shopping';
				firebase.database().ref(fridgePath).once('value', function(snapshot) {
					if (snapshot === null) {
						// list empty, do nothing?
					}
					else {
						let fridgeBuf = {}; 
						firebase.database().ref(fridgePath).orderByChild('1').once('value', function(snapshot) {
							snapshot.forEach((child) => {
								fridgeBuf[child.key] = child.val();
								//self.setState({page : PageEnum.FRIDGE});
							})
							//self.setState({ fridgeItems : fridgeBuf});
						});
			
						let shoppingBuf = [];
						firebase.database().ref(shoppingPath).once('value', function(snapshot) {
							snapshot.forEach((child) => {
								shoppingBuf.push(child.val());
							})

							//self.setState({ shoppingItems : shoppingBuf});
						});
					}
				});
			}
			else {
				// self.setState({ 
				// 	fridgeItems : {},
				// 	shoppingItems : [],
				// 	page: PageEnum.FRIDGE
				// });
			}
		});
	}

	render() {
		return (
			<div>
			{this.state.userID ? (
             	 <div>
               		<App />
            	</div>
           ) : (
                 <div style={divStyle}>
					<img style={fridgeStyle} src={Fridge} />
						<StyleFirebaseAuth
						uiConfig={this.uiConfig}
						firebaseAuth={firebase.auth()}
						/>
				</div>
		)}
           </div>
	);}
} 
