import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    userByUsername: async (_, { username }, {}) => {
      const users = await prisma.users({
        where: { username_starts_with: username },
      });
      return users;
    },
  },
};
