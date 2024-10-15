import prisma from "./prisma";
import { shopCreateSelect } from "./selects/shopSelect";

async function createShop(creatData) {
  return await prisma.shop.creat({
    data: creatData,
    select: shopCreateSelect,
  });
}

export default { createShop };
