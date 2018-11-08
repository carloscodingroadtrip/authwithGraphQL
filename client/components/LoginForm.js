import React, { Component } from 'react';
import AuthForm from './AuthForm';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Login';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';
class LoginForm extends Component {
	constructor (props) {
		super(props);

		this.state = {
			errors: [],
		};
	}

	componentDidUpdate (prevProps) {
		if (!prevProps.data.currentUser && this.props.data.currentUser) {
			// redirect to dashboard
			console.log('go to dashboard');
			hashHistory.push('/dashboard');
		} else {
			console.log('Keep user at login');
		}
	}

	onSubmit ({ email, password }) {
		this.props
			.mutate({
				variables: {
					email,
					password,
				},
				refetchQueries: [ { query } ],
			})
			.catch((res) => {
				const errors = res.graphQLErrors.map((error) => error.message);
				this.setState({ errors });
			});
	}

	render () {
		return (
			<div>
				<h3>Login</h3>
				<AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />;
			</div>
		);
	}
}

export default graphql(query)(graphql(mutation)(LoginForm));
