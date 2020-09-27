export default {
  Query: {
    allUsers: async (_, __, { prisma }) => {
      return await prisma.users();
    },
  },
};
