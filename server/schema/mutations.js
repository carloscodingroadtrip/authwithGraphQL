const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;
const AuthService = require('../services/auth');
const UserType = require('./types/user_type');

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		//It should return a user that was created
		// >>> a UserType
		signup: {
			type: UserType,
			args: {
				email: { type: GraphQLString },
				password: { type: GraphQLString },
			},
			//now we will do the resolve, and we will pass a third argument
			// request or context in some other documentation
			// that is the request object coming from Express
			resolve (parentValue, { email, password }, req) {
				//since AuthService returns a promise, and whenever we
				//return a promise from our resolve function, we have to
				//make sure to return it so that GraphQL knows to
				//look at the promise that gets returned, and say
				//'Ok, I am just gonna hold up for a second and wait for
				// this operation to resolve before I attempt to return any
				// value to the front-end"
				return AuthService.signup({ email, password, req });
			},
		},
		logout: {
			type: UserType,
			resolve (parentValue, args, req) {
				//first let's save the reference to the user we need to logout
				const { user } = req;
				req.logout();
				return user;
			},
		},
	},
});

module.exports = mutation;
