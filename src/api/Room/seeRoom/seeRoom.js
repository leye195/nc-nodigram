import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeRoom: async (_, { roomId }, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const canSee = await prisma.$exists.room({
        participants_some: { id: user.id },
      });
      if (canSee) {
        const room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
        return room;
      } else {
        throw Error("Can not see this");
      }
    },
  },
};
