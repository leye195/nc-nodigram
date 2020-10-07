import { prisma } from "../../../../generated/prisma-client";
import { PROFILE_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeProfile: async (_, { username }, {}) => {
      const user = await prisma.user({ username }).$fragment(PROFILE_FRAGMENT);
      const posts = await prisma.user({ username }).post();
      return { user, posts };
    },
  },
};
