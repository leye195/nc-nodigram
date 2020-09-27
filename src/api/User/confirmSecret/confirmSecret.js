import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, { email, secret }, { prisma }) => {
      //console.log(request);
      const user = await prisma.user({ email });
      if (user.loginSecret === secret) {
        //jwt
        await prisma.updateUser({
          where: { id: user.id },
          data: { loginSecret: "" },
        }); // clean LoginSecret
        const token = generateToken(user.id);
        return token;
      } else {
        throw Error("Wrong Email/Secret Validation");
      }
    },
  },
};
