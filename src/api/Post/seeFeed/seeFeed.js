export default {
  Query: {
    seeFeed: async (_, __, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma.user({ id: user.id }).following();
      const posts = await prisma.posts({
        where: {
          user: { id_in: [...following.map((u) => u.id), user.id] },
        },
        orderBy: "createdAt_DESC",
      });
      return posts;
    },
  },
};
