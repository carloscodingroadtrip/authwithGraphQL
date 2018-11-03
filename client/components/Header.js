import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';

class Header extends Component {
	renderButtons () {
		console.log(this.props.data);

		const { loading, currentUser } = this.props.data;
		if (loading) {
			return <div />;
		}

		//Do we show the buttons, which ones ?
		//If user exist
		if (currentUser) {
			return <div>Logout</div>;
		} else {
			return <div>You are not signed in</div>;
		}
	}

	render () {
		// console.log(this.props.data);
		return (
			<nav className="">
				<div className="nav-wrapper">{this.renderButtons()}</div>
			</nav>
		);
	}
}

export default graphql(query)(Header);
