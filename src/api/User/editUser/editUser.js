//import { prisma } from "../../../../generated/prisma-client";
export default {
  Mutation: {
    editUser: (
      _,
      { username, email, firstName, lastName, bio, avatar },
      { request, isAuthenticated, prisma }
    ) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.updateUser({
        where: { id: user.id },
        data: { username, email, firstName, lastName, bio, avatar },
      });
    },
  },
};
