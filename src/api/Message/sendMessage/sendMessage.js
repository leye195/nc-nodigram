import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    sendMessage: async (
      _,
      { roomId, message, toId },
      { request, isAuthenticated, prisma }
    ) => {
      isAuthenticated(request);
      const { user } = request;
      let room;
      if (roomId) {
        //roomId is defined, to is undefined
        //send new message to room
        room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      } else {
        //roomId is undefined, to is defined
        //create new room and send new message
        if (toId !== user.id) {
          room = await prisma
            .createRoom({
              participants: { connect: [{ id: toId }, { id: user.id }] },
            })
            .$fragment(ROOM_FRAGMENT);
        }
      }
      if (!room) {
        throw Error("Room not found");
      }
      const getTo = room.participants.filter(
        (participant) => participant.id !== user.id
      )[0];
      const newMessage = await prisma.createMessage({
        text: message,
        to: { connect: { id: roomId ? getTo.id : toId } },
        from: { connect: { id: user.id } },
        room: { connect: { id: room.id } },
      });

      return newMessage;
    },
  },
};
