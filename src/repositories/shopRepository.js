import prisma from "./prisma.js";

import { shopCreateSelect } from "./selects/shopSelect.js";

async function createShop(createData) {
  console.log(createData);
  return await prisma.shop.create({
    data: createData,
    select: shopCreateSelect,
  });
}

export default { createShop };
