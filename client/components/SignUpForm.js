import React, { Component } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';
class SignUp extends Component {
	constructor (props) {
		super(props);

		this.state = {
			errors: [],
		};
	}

	onSubmit ({ email, password }) {
		this.props
			.mutate({
				variables: { email, password },
				refetchQueries: [ { query } ],
			})
			.catch((res) => {
				const errors = res.graphQLErrors.map((error) => error.message);
				this.setState({ errors });
			});
	}

	componentDidUpdate (prevProps) {
		if (!prevProps.data.currentUser && this.props.data.currentUser) {
			// redirect to dashboard
			console.log('go to dashboard');
			hashHistory.push('/dashboard');
		} else {
			console.log('Keep user out of the dashboard !!!!');
		}
	}

	render () {
		return (
			<div>
				<h3>Sign up</h3>
				<AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
			</div>
		);
	}
}

export default graphql(query)(graphql(mutation)(SignUp));
