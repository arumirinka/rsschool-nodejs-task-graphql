import { GraphQLFloat, GraphQLObjectType, GraphQLString } from "graphql";
import { Profile } from "./profiles.js";

export const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: { type: Profile },
  },
});
