import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";
import { Profile } from "./profiles.js";
import { Post } from "./posts.js";
import { UUIDType } from "./uuid.js";

export const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: Profile,
      resolve: async (src, _args, context) => {
        const profile = await context.dataLoaders.profilesLoader.load(src.id);
        return profile;
      },
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: async (src, _args, context) => {
        const posts = await context.dataLoaders.postsLoader.load(src.id);
        return posts;
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(User),
      resolve: async (src, _args, context) => {
        const users = await context.dataLoaders.userSubscribedToLoader.load(src.id);
        return users;
      },
    },
    subscribedToUser: {
      type: new GraphQLList(User),
      resolve: async (src, _args, context) => {
        const users = await context.dataLoaders.subscribedToUserLoader.load(src.id);
        return users;
      },
    },
  }),
});

export const CreateUserInput = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});

export const ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});

export type UserInputData = {
  dto: {
    name: string,
    balance: string,
  },
  id?: string,
};

export type SubscriptionInputData = {
  userId: string,
  authorId: string,
};
