export default {
  Query: {
    searchPost: async (_, { term }, { prisma }) => {
      const posts = await prisma.posts({
        where: {
          OR: [
            {
              location_starts_with: term,
            },
            { caption_starts_with: term },
          ],
        },
      });
      return posts;
    },
  },
};
