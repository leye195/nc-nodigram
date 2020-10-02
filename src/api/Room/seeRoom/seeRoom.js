import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeRoom: async (_, { roomId }, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      const canSee = await prisma.$exists.room({
        //id: roomId,
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
