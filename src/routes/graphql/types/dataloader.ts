import { PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

export const useDataLoaders = (prisma: PrismaClient) => ({
  memberTypesLoader: new DataLoader(async (ids: readonly string[]) => {
    const memberTypesDB = await prisma.memberType.findMany({
      where: {
        id: {
          in: Array.from(ids),
        },
      },
    });
    const memberTypes = ids.map(id => memberTypesDB.find(type => type.id === id));
    return memberTypes;
  }),
  postsLoader: new DataLoader(async (ids: readonly string[]) => {
    const postsDB = await prisma.post.findMany({
      where: {
        authorId: {
          in: Array.from(ids),
        },
      },
    });
    const posts = ids.map(id => postsDB.filter(post => post.authorId === id));
    return posts;
  }),
  profilesLoader: new DataLoader(async (ids: readonly string[]) => {
    const profilesDB = await prisma.profile.findMany({
      where: {
        userId: {
          in: Array.from(ids),
        },
      },
    });
    const profiles = ids.map(id => profilesDB.find(profile => profile.userId === id));
    return profiles;
  }),
  subscribedToUserLoader: new DataLoader(async (ids: readonly string[]) => {
    const usersDB = await prisma.user.findMany({
      where: {
        id: {
          in: Array.from(ids),
        },
      },
      include: {
        subscribedToUser: {
          select: {
            subscriber: true,
          },
        },
      },
    });
    const users = ids.map(id => usersDB.filter(user => user.subscribedToUser.some(el => el.subscriber.id === id)));
    return users;
  }),
  userSubscribedToLoader: new DataLoader(async (ids: readonly string[]) => {
    const usersDB = await prisma.user.findMany({
      where: {
        id: {
          in: Array.from(ids),
        },
      },
      include: {
        userSubscribedTo: {
          select: {
            author: true,
          },
        },
      },
    });
    const users = ids.map(id => usersDB.filter(user => user.userSubscribedTo.some(el => el.author.id === id)));
    return users;
  }),
});
