import React, { Component } from 'react';

export default class Dashboard extends Component {
	render () {
		return (
			<div>
				<h3>Dashboard</h3>
				<p>You are logged in {this.props.data.currentUser}</p>
			</div>
		);
	}
}
