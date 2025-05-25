import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { MemberType } from "./members.js";

export const Profile = new GraphQLObjectType({
  name: 'Profile',
  fields: {
    id: { type: GraphQLString },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberType: { type: MemberType },
  },
});
