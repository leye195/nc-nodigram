import { prisma } from "../../../../generated/prisma-client";
export default {
  Subscription: {
    newMessage: {
      subscribe: (_, { roomId }) => {
        return prisma.$subscribe
          .message({
            AND: [
              { mutation_in: "CREATED" },
              {
                node: {
                  room: { id: roomId },
                },
              },
            ],
          })
          .node();
      },
      resolve: (payload) => payload,
    },
  },
};
