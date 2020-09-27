export default {
  Query: {
    userById: async (_, { id }, { prisma }) => {
      const user = await prisma.user({ id });
      const posts = await prisma.user({ id }).post();
      return { user, posts };
    },
  },
};
