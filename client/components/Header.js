import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { Link } from 'react-router';
import mutation from '../mutations/Logout';
class Header extends Component {
	onLogoutClick (props) {
		this.props.mutate({
			refetchQueries: [ { query } ],
		});
	}
	renderButtons () {
		// console.log(this.props.data);
		const { loading, currentUser } = this.props.data;
		if (loading) {
			return <div />;
		}
		//Do we show the buttons, which ones ?
		//If user exist
		if (currentUser) {
			return (
				<li>
					<a onClick={this.onLogoutClick.bind(this)}>Logout</a>
				</li>
			);
		} else {
			return (
				<div>
					<li>
						<Link to="/signup">Signup</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
				</div>
			);
		}
	}

	render () {
		// console.log(this.props.data);
		return (
			<nav className="">
				<div className="nav-wrapper">
					<Link to="/" className="brand-logo left">
						Home
					</Link>
					<ul className="right">{this.renderButtons()}</ul>
				</div>
			</nav>
		);
	}
}

export default graphql(mutation)(graphql(query)(Header));
