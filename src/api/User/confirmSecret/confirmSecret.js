import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, { email, secret }, { prisma, request }) => {
      console.log(request);
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        //jwt
        const token = generateToken(user.id);
        return token;
      } else {
        throw Error("Wrong Email/Secret Validation");
      }
    },
  },
};
