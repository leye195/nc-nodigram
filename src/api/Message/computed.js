import { prisma } from "../../../generated/prisma-client";

export default {
  Message: {
    room: ({ id }, _, __) => prisma.message({ id }).room(),
    from: ({ id }, _, __) => prisma.message({ id }).from(),
    to: ({ id }, _, __) => prisma.message({ id }).to(),
  },
};
