import { prisma } from "../../../generated/prisma-client";
import { COMMENT_FRAGMENT, FULL_POST_USER_FRAGMENT } from "../../fragments";

export default {
  Post: {
    files: ({ id }, _, { prisma }) => prisma.post({ id }).files(),
    comments: ({ id }, _, {}) =>
      prisma
        .post({ id })
        .comments()
        .$fragment(COMMENT_FRAGMENT),
    user: ({ id }, _, { prisma }) =>
      prisma
        .post({ id })
        .user()
        .$fragment(FULL_POST_USER_FRAGMENT),
    isLiked: async (parent, _, { request, prisma }) => {
      const { user } = request;
      const { id } = parent;
      try {
        const liked = await prisma.$exists.like({
          AND: [{ user: { id: user.id } }, { post: { id } }],
        });
        return liked;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    commentCount: async ({ id }, _, { prisma }) => {
      const commentCount = await prisma
        .commentsConnection({ where: { post: { id } } })
        .aggregate()
        .count();
      return commentCount;
    },
    likeCount: async ({ id }, _, { prisma }) => {
      const likeCount = await prisma
        .likesConnection({ where: { post: { id } } })
        .aggregate()
        .count();
      return likeCount;
    },
  },
};
