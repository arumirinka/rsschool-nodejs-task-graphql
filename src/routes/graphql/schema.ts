import { GraphQLList, GraphQLObjectType, GraphQLSchema } from "graphql";
import { MemberType } from "./types/members.js";

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async (_, _args, context) => {
        const res = await context.prisma.memberType.findMany();
        return res;
      },
    },
  }
});

export const schema = new GraphQLSchema({
  types: [MemberType],
  query
});
