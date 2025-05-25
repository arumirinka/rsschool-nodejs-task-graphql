import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { MemberType } from "./types/members.js";
import { User } from "./types/users.js";
import { Post } from "./types/posts.js";
import { Profile } from "./types/profiles.js";

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
    users: {
      type: new GraphQLList(User),
      resolve: async (_, _args, context) => {
        const users = await context.prisma.user.findMany();
        return users;
      },
    },
    user: {
      type: User,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: async (_, args: { id: string }, context) => {
        const user = await context.prisma.user.findUnique({
          where: {
            id: args.id,
          },
        });
        return user;
      },
    },
    posts: {
      type: new GraphQLList(Post),
      resolve: async (_, _args, context) => {
        const posts = await context.prisma.post.findMany();
        return posts;
      },
    },
    profiles: {
      type: new GraphQLList(Profile),
      resolve: async (_, _args, context) => {
        const profiles = await context.prisma.profile.findMany();
        return profiles;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  types: [MemberType, User, Post, Profile],
  query
});
