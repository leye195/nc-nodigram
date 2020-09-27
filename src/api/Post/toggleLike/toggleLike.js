import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
  Mutation: {
    toggleLike: async (_, { postId }, { request }) => {
      try {
        isAuthenticated(request);
        const { user } = request;
        const existingLike = await prisma.$exists.like({
          AND: [{ user: { id: user.id }, post: { id: postId } }],
        });
        if (existingLike) {
          // To Do
        } else {
          await prisma.createLike({
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
          });
        }
        return true;
      } catch (e) {
        return false;
      }
    },
  },
};
