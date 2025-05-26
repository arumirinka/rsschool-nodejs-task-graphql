import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLObjectType } from "graphql";
import { MemberType, MemberTypeId } from "./members.js";
import { UUIDType } from "./uuid.js";
import { MemberTypeId as MemberTypeIdEnum } from "../../member-types/schemas.js";

export const Profile = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberType: {
      type: MemberType,
      resolve: async (src, _args, context) => {
        const res = await context.dataLoaders.memberTypesLoader.load(src.memberTypeId);
        return res;
      },
    },
    memberTypeId: { type: MemberTypeId },
  }),
});

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeId },
  }),
});

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeId },
  }),
});

export type ProfileInputData = {
  dto: {
    isMale: boolean,
    yearOfBirth: number,
    userId: string,
    memberTypeId: MemberTypeIdEnum,
  },
  id?: string,
};
