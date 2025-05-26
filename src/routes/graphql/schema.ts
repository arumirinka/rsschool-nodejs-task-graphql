import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { MemberType, MemberTypeId } from "./types/members.js";
import { User } from "./types/users.js";
import { Post } from "./types/posts.js";
import { Profile } from "./types/profiles.js";
import { UUIDType } from "./types/uuid.js";

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
    memberType: {
      type: MemberType,
      args: {
        id: {
          type: MemberTypeId,
        },
      },
      resolve: async (_, args: { id: string }, context) => {
        const res = await context.prisma.memberType.findUnique({
          where: {
            id: args.id,
          },
        });
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
          type: UUIDType,
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
    post: {
      type: Post,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_, args: { id: string }, context) => {
        const post = await context.prisma.post.findUnique({
          where: {
            id: args.id,
          },
        });
        return post;
      },
    },
    profiles: {
      type: new GraphQLList(Profile),
      resolve: async (_, _args, context) => {
        const profiles = await context.prisma.profile.findMany();
        return profiles;
      },
    },
    profile: {
      type: Profile,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_, args: { id: string }, context) => {
        const profile = await context.prisma.profile.findUnique({
          where: {
            id: args.id,
          },
        });
        return profile;
      },
    },
  },
});

export const schema = new GraphQLSchema({
  types: [MemberType, User, Post, Profile],
  query
});
