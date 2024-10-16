import prisma from "./prisma";

async function getByFilter(filter) {
  return await prisma.own.findMany({
    where: filter,
  });
}

export default { getByFilter };
