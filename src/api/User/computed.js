import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: async (parent) => {
      //parent는 상위 resolver에서 반환된 값을 가쟈옴
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      try {
        const isExist = await prisma.$exists.user({
          AND: [{ id: user.id }, { following_some: { id: parentId } }],
        });
        return isExist;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
    postsCount: ({ id }) =>
      prisma
        .postsConnection({ where: { user: { id } } })
        .aggregate()
        .count(),
    followingCount: ({ id }) => {
      return prisma
        .usersConnection({
          where: { followers_some: { id } },
        })
        .aggregate()
        .count();
    },
    followersCount: ({ id }) =>
      prisma
        .usersConnection({ where: { following_some: { id } } })
        .aggregate()
        .count(),
  },
};
