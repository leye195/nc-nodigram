import { prisma } from "../../../../generated/prisma-client";
import { FULL_POST_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    editPost: async (
      _,
      { id, caption, location, action },
      { request, isAuthenticated }
    ) => {
      isAuthenticated(request);
      const { user } = request;
      const isExist = await prisma.$exists.post({ id, user: { id: user.id } });
      if (isExist) {
        if (action === "EDIT") {
          const post = await prisma.updatePost({
            where: { id },
            data: { caption, location },
          });
          return post;
        } else if (action === "DELETE") {
          const post = await prisma.deletePost(id);
          return post;
        }
      } else {
        throw Error("You can't edit that post");
      }
    },
  },
};
