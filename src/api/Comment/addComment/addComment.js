export default {
  Mutation: {
    addComment: async (
      _,
      { text, postId },
      { request, prisma, isAuthenticated }
    ) => {
      try {
        isAuthenticated(request);
        const { user } = request;
        const comment = await prisma.createComment({
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
        });
        return comment;
      } catch (e) {
        return false;
      }
    },
  },
};
