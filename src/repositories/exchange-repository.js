import prisma from "./prisma.js";
import { exchangeCardInfo } from "./selects/exchange-select.js";

async function checkExchangeByUser(filter) {
  return await prisma.exchange.findMany({
    where: filter,
    select: exchangeCardInfo,
  });
}

export default { checkExchangeByUser };
