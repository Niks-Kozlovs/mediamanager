import { hash } from "bcrypt";
import { prisma } from "../../lib/prisma";

(async () => {
  await prisma.user.deleteMany();

  const hashedPassword = await hash("000000", 7);

  await prisma.user.create({
    data: {
      username: "mrtester",
      email: "n@nn.lv",
      passhash: hashedPassword,
    }
  });
})();

export {};
