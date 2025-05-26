import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from "graphql";
import { MemberType } from "./members.js";
import { UUIDType } from "./uuid.js";

export const Profile = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberType: {
      type: MemberType,
      resolve: async (src, _args, context) => {
        const res = await context.prisma.memberType.findUnique({
          where: {
            id: src.memberTypeId,
          },
        });
        return res;
      },
    },
  }),
});
