import prisma from "./prisma.js";
import { ownSelect } from "./selects/own-select.js";

async function getByFilter(filter) {
  return await prisma.own.findFirstOrThrow({
    where: filter,
    select: ownSelect,
  });
}

async function update(where, data) {
  return await prisma.own.update({
    where,
    data,
  });
}

export default { getByFilter, update };
