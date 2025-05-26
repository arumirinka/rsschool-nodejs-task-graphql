import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType } from "graphql";
import { Profile } from "./profiles.js";

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: { value: 'BASIC' },
    BUSINESS: { value: 'BUSINESS' },
  }
});

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: new GraphQLList(Profile),
      resolve: async (src, _args, context) => {
        const profile = await context.dataLoaders.profilesLoader.load(src.id);
        return profile;
      },
    },
  }),
});
