//import { prisma } from "../../../../generated/prisma-client";

import { FULL_POST_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, { id }, { prisma }) => {
      const post = await prisma.post({ id }).$fragment(FULL_POST_FRAGMENT);
      //const comments = await prisma
      //.post({ id })
      //.comments()
      //.$fragment(COMMENT_FRAGMENT);
      //const files = await prisma.post({ id }).files();
      return post;
    },
  },
};
