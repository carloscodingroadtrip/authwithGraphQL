import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import currentUserQuery from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

export default (WrappedComponent) => {
	class RequireAuth extends Component {
		shouldComponentUpdate (nextProps) {
			console.log(this.props.data.loading);
			console.log(this.props.data.currentUser);

			if (!this.props.data.loading && !this.props.data.currentUser) {
				hashHistory.push('/login');
			}
		}

		render () {
			return <WrappedComponent {...this.props} />;
		}
	}

	graphql(currentUserQuery)(RequireAuth);
};
