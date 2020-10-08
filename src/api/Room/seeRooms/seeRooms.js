import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeRooms: async (_, __, { request, isAuthenticated, prisma }) => {
      isAuthenticated(request);
      const { user } = request;
      const rooms = await prisma
        .rooms({
          where: { participants_some: { id: user.id } },
        })
        .$fragment(ROOM_FRAGMENT);
      console.log(rooms);
      return rooms;
    },
  },
};
