import { prisma } from "../../../../generated/prisma-client";
export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, firstName = "", lastName = "", bio = "", avatar = "" },
      {}
    ) => {
      const isExist = await prisma.$exists.user({
        OR: [{ username }, { email }],
      });
      if (isExist) {
        throw Error("There UserName/Email is already taken");
      } else {
        const user = await prisma.createUser({
          username,
          email,
          firstName,
          lastName,
          bio,
          avatar,
        });
        return true;
      }
    },
  },
};
