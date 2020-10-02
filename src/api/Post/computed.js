export default {
  Post: {
    files: ({ id }, _, { prisma }) => prisma.post({ id }).files(),
    comments: ({ id }, _, { prisma }) => prisma.post({ id }).comments(),
    user: ({ id }, _, { prisma }) => prisma.post({ id }).user(),
    isLiked: async (parent, _, { request, prisma }) => {
      const { user } = request;
      const { id } = parent;
      try {
        const liked = await prisma.$exists.like({
          AND: [{ user: { id: user.id } }, { post: { id } }],
        });
        return liked;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    likeCount: async ({ id }, _, { prisma }) => {
      const likeCount = await prisma
        .likesConnection({ where: { post: { id } } })
        .aggregate()
        .count();
      return likeCount;
    },
  },
};
