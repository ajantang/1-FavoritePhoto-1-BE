import prisma from "./prisma.js";

async function create(createData, select) {
  return await prisma.purchase.create({
    data: createData,
    select,
  });
}

export default { create };
