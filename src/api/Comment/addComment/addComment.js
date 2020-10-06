import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    addComment: async (_, { text, postId }, { request, isAuthenticated }) => {
      try {
        isAuthenticated(request);
        const { user } = request;
        const comment = await prisma
          .createComment({
            text,
            user: {
              connect: {
                id: user.id,
              },
            },
            post: {
              connect: {
                id: postId,
              },
            },
          })
          .$fragment(COMMENT_FRAGMENT);
        return comment;
      } catch (e) {
        return false;
      }
    },
  },
};
