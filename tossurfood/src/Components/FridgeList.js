import React, { Component } from 'react';
import FridgeItem from './FridgeItem'

export default class FridgeList extends React.Component{

	render() {
		const myFood = {"apples":"3 days", "milk":"7 days", "eggs":"15 days"};
		const productList = Object.entries(myFood).map(([product, date]) => (
			<FridgeItem item={product} date={date}></FridgeItem>
			)
		);

		return(
			<div >{productList}</div>

		)
	}
}