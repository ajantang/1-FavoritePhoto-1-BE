import prisma from "./prisma";
import { userOwnSelect } from "./selects/user-select.js";

async function getByFilter(filter) {
  return await prisma.own.findMany({
    where: filter,
    select: userOwnSelect,
  });
}

async function update(updateData) {
  const { where, data } = updateData;
  return await prisma.own.update({
    where,
    data,
  });
}

export default { getByFilter, update };
