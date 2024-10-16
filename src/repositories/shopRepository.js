import prisma from "./prisma.js";
import { shopCreateSelect } from "./selects/shopSelect.js";

async function createShop(createData) {
  return await prisma.shop.create({
    data: createData,
    select: shopCreateSelect,
  });
}

export default { createShop };
