const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;
const UserType = require('./user_type');
const RootQueryType = new GraphQLObjectType({
	name: 'RootQueryType',
	//By default, GraphQl expects to have at least one field
	//available for every single defined type, therefore
	//we will add a dummy field so we don't get any errors
	fields: {
		currentUser: {
			type: UserType,
			resolve (parentValue, args, req) {
				return req.user;
			},
		},
	},
});

module.exports = RootQueryType;
