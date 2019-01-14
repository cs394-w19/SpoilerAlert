import React from 'react';

export default class Settings extends React.Component{
	
	render() {
		return (	
			<>
			<div>
				<div> Phone Number: 
					<input type="text" />
				</div>
				<div> Notification Settings:
				</div>
				<div> SMS Messages 
					<input type="radio" />
				</div>
				<div> Email 
					<input type="radio" />
				</div>
 			</div> 		
			</>
		)
	}
}
