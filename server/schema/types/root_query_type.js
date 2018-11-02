const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;

const RootQueryType = new GraphQLObjectType({
	name: 'RootQueryType',
	//By default, GraphQl expects to have at least one field
	//available for every single defined type, therefore
	//we will add a dummy field so we don't get any errors
	fields: {
		dummyField: { type: GraphQLID },
	},
});

module.exports = RootQueryType;
