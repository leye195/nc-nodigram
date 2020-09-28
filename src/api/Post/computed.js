export default {
  Post: {
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
    likeCount: async (parent, _, { prisma }) => {
      const { id } = parent;
      const likeCount = await prisma
        .likesConnection({ where: { post: { id } } })
        .aggregate()
        .count();
      return likeCount;
    },
  },
};
