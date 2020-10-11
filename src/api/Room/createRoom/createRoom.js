import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Mutation: {
    createRoom: async (_, { username }, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      try {
        const isExist = await prisma.$exists.room({
          participants_some: {
            AND: { username },
          },
        });
        let room = null;
        console.log(isExist);
        if (isExist) {
          const roomList = await prisma
            .rooms({
              where: {
                participants_some: { username },
              },
            })
            .$fragment(ROOM_FRAGMENT);
          for (let i = 0; i < roomList.length; i++) {
            if (
              roomList[i].participants.filter(
                (p) => p.username === user.username
              )
            ) {
              //console.log(room[i]);
              room = roomList[i];
              break;
            }
          }
          if (!room) throw new Error("Room not found");
        } else {
          room = await prisma.createRoom({
            participants: {
              connect: [{ username }, { username: user.username }],
            },
          });
        }
        return room;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
