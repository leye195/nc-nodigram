export default {
  Query: {
    myProfile: async (_, __, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      const me = await prisma.user({ id: user.id });
      const posts = await prisma.user({ id: user.id }).post();
      return { user: me, posts };
    },
  },
};
