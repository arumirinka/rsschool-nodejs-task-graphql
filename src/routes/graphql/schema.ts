import { GraphQLBoolean, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { MemberType, MemberTypeId } from "./types/members.js";
import { User, CreateUserInput, UserInputData, ChangeUserInput, SubscriptionInputData } from "./types/users.js";
import { Post, CreatePostInput, PostInputData, ChangePostInput } from "./types/posts.js";
import { Profile, CreateProfileInput, ProfileInputData, ChangeProfileInput } from "./types/profiles.js";
import { UUIDType } from "./types/uuid.js";

const query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
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
  }),
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createUser: {
      type: User,
      args: {
        dto: {
          type: CreateUserInput,
        },
      },
      resolve: async (_, args: UserInputData, context) => {
        return await context.prisma.user.create({
          data: args.dto,
        });
      },
    },
    deleteUser: {
      type: GraphQLBoolean,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_, args: { id: string }, context) => {
        const res = await context.prisma.user.delete({
          where: {
            id: args.id,
          }
        });
        return Boolean(res);
      },
    },
    changeUser: {
      type: User,
      args: {
        id: {
          type: UUIDType,
        },
        dto: {
          type: ChangeUserInput,
        }
      },
      resolve: async (_, args: UserInputData, context) => {
        return await context.prisma.user.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        });
      },
    },
    createPost: {
      type: Post,
      args: {
        dto: {
          type: CreatePostInput,
        },
      },
      resolve: async (_, args: PostInputData, context) => {
        return await context.prisma.post.create({
          data: args.dto,
        });
      },
    },
    deletePost: {
      type: GraphQLBoolean,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_, args: { id: string }, context) => {
        const res = await context.prisma.post.delete({
          where: {
            id: args.id,
          }
        });
        return Boolean(res);
      },
    },
    changePost: {
      type: Post,
      args: {
        id: {
          type: UUIDType,
        },
        dto: {
          type: ChangePostInput,
        },
      },
      resolve: async (_, args: PostInputData, context) => {
        return await context.prisma.post.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        });
      },
    },
    createProfile: {
      type: Profile,
      args: {
        dto: {
          type: CreateProfileInput,
        },
      },
      resolve: async (_, args: ProfileInputData, context) => {
        return await context.prisma.profile.create({
          data: args.dto,
        });
      },
    },
    deleteProfile: {
      type: GraphQLBoolean,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (_, args: { id: string }, context) => {
        const res = await context.prisma.profile.delete({
          where: {
            id: args.id,
          }
        });
        return Boolean(res);
      },
    },
    changeProfile: {
      type: Profile,
      args: {
        id: {
          type: UUIDType,
        },
        dto: {
          type: ChangeProfileInput,
        },
      },
      resolve: async (_, args: ProfileInputData, context) => {
        return await context.prisma.profile.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        });
      },
    },
    subscribeTo: {
      type: GraphQLString,
      args: {
        userId: {
          type: UUIDType,
        },
        authorId: {
          type: UUIDType,
        },
      },
      resolve: async (_, args: SubscriptionInputData, context) => {
        await context.prisma.subscribersOnAuthors.create({
          data: {
            subscriberId: args.userId,
            authorId: args.authorId,
          },
        });
        return "done";
      },
    },
    unsubscribeFrom: {
      type: GraphQLString,
      args: {
        userId: {
          type: UUIDType,
        },
        authorId: {
          type: UUIDType,
        },
      },
      resolve: async (_, args: SubscriptionInputData, context) => {
        await context.prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId,
            },
          },
        });
        return "done";
      },
    },
  }),
});

export const schema = new GraphQLSchema({
  types: [MemberType, User, Post, Profile],
  query,
  mutation,
});
