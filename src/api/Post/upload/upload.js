import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
  Mutation: {
    upload: async (_, { caption, files }, { request, isAuthenticated }) => {
      try {
        isAuthenticated(request);
        const { user } = request;
        const post = await prisma.createPost({
          caption,
          user: {
            connect: {
              id: user.id,
            },
          },
        });
        files.forEach(async (file) => {
          await prisma.createFile({
            url: file,
            post: {
              connect: {
                id: post.id,
              },
            },
          });
        });
        return post;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
