//import { prisma } from "../../../../generated/prisma-client";
//import { isAuthenticated } from "../../../middlewares";s
export default {
  Mutation: {
    toggleLike: async (_, { postId }, { request, prisma, isAuthenticated }) => {
      try {
        isAuthenticated(request);
        const { user } = request;
        const filterOptions = {
          AND: [{ user: { id: user.id }, post: { id: postId } }],
        };
        const existingLike = await prisma.$exists.like(filterOptions);
        if (existingLike) {
          // To Do
          await prisma.deleteManyLikes(filterOptions);
          return true;
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
          return true;
        }
      } catch (e) {
        return false;
      }
    },
  },
};
