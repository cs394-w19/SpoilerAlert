import React from 'react';
import Fridge from '../data/logo.png';
import firebase from "firebase";
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

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
	uiConfig = {
		signInFlow: "popup",
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID
		],
		callbacks: {
			signInSuccessWithAuthResults: () => false
		}
    };
    
	render() {
		return (
			<div>
                 <div style={divStyle}>
					<img style={fridgeStyle} src={Fridge} />
						<StyleFirebaseAuth
						uiConfig={this.uiConfig}
						firebaseAuth={firebase.auth()}
						/>
				</div>
           </div>
	);}
} 
