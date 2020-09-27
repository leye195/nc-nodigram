import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
  Mutation: {
    toggleFollowUser: async (_, { followId }, { request }) => {
      try {
        isAuthenticated(request);
        const { user } = request;
        const isFollowing = await prisma.$exists.user({
          AND: [{ following_some: { id: followId } }],
        });
        if (isFollowing) {
          await prisma.updateUser({
            where: { id: user.id },
            data: { following: { disconnect: { id: followId } } },
          });
        } else {
          await prisma.updateUser({
            data: { following: { connect: { id: followId } } },
            where: { id: user.id },
          });
        }
        return true;
      } catch (e) {
        return false;
      }
    },
  },
};
