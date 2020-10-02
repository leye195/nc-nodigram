export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, firstName = "", lastName = "", bio = "", avatar = "" },
      { prisma }
    ) => {
      const user = await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio,
        avatar,
      });
      return user;
    },
  },
};
