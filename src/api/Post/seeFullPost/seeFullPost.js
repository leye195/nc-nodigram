export default {
  Query: {
    seeFullPost: async (_, { id }, { prisma }) => {
      const post = await prisma.post({ id });
      return post;
    },
  },
};
