import prisma from "./prisma.js";

async function createData({ data, select }) {
  return await prisma.purchase.create({ data, select });
}

export default { createData };
