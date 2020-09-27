export default {
  Query: {
    userById: async (_, { id }, { prisma }) => {
      return await prisma.user({ id }).$fragment("posts");
    },
  },
};
