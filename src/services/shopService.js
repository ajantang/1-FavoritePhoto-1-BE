import shopRepository from "../repositories/shopRepository.js";

async function createShop(createData) {
  const { own, ...rest } = createData;
  return await shopRepository.createShop(rest);
}

async function getByFilter(query) {
  const {
    sort,
    genre,
    grade,
    sellout,
    pageNum,
    pageSize,
    keyword = "",
  } = query;
  console.log(sellout)

  const page = pageNum || 1;
  const pageSizeNum = pageSize || 15;
  const offset = (page - 1) * pageSizeNum;

  let orderBy;
  switch (sort) {
    case "recent":
      orderBy = { createdAt: "desc" }; // 최신순
      break;
    case "oldest":
      orderBy = { createdAt: "asc" }; // 오래된 순
      break;
    case "cheapest":
      orderBy = { price: "asc" }; // 가격이 낮은 순
      break;
    case "highest":
      orderBy = { price: "desc" }; // 가격이 높은 순
      break;
    default:
      orderBy = { createdAt: "desc" }; // 기본값: 최신순
  }

  const whereOrBody = {
    contains: keyword,
    mode: "insensitive",
  };
  const whereOr = {
    OR: [
      {
        name: whereOrBody,
      },
      {
        description: whereOrBody,
      },
    ],
  };

  let selloutWhere;
  if (sellout === 'true') {
    selloutWhere = { remainingQuantity: 0 };
  } else if (sellout === 'false') {
    selloutWhere = { remainingQuantity: { gt: 0 } };
  } else {
    selloutWhere = { remainingQuantity: { gte: 0 } };
  }

  const where = {
    Card: {
      ...(genre ? { genre: parseInt(genre, 10) } : {}),
      ...(grade ? { grade: parseInt(grade, 10) } : {}),
      ...whereOr,
    },
    ...selloutWhere,
  };

  const filterOptions = {
    orderBy,
    skip: parseInt(offset),
    take: parseInt(pageSizeNum),
    where,
  };

  return await shopRepository.getByFilter(filterOptions);
}

export default {
  createShop,
  getByFilter,
};
