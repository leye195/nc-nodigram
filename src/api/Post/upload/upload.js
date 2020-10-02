export default {
  Mutation: {
    upload: async (
      _,
      { caption, files },
      { request, isAuthenticated, prisma }
    ) => {
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
