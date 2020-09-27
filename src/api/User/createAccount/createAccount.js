export default {
  Mutation: {
    createAccount: async (
      _,
      { username, email, firstName = "", lastName = "", bio = "" },
      { prisma,request }
    ) => {
      const user = await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio,
      });
      return user;
    },
  },
};
