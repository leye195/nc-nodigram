import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    explorePost: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const users = await prisma.users({
        where: { OR: [{ id: user.id }, { followers_some: { id: user.id } }] },
      });
      const posts = await prisma.posts({
        where: { likes_some: { user: { id_in: [...users.map((u) => u.id)] } } },
      });
      return posts;
    },
  },
};
