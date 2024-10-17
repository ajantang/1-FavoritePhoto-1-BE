export function createCardListFilterByQuery(query) {
  const { sort, genre, grade, pageNum, pageSize, keyword = "" } = query;

  const page = pageNum || 1;
  const pageSizeNum = pageSize || 15;
  const offset = (page - 1) * pageSizeNum;

  let orderBy;
  switch (sort) {
    case "recent":
      orderBy = { createdAt: "desc" };
      break;
    case "oldest":
      orderBy = { createdAt: "asc" };
      break;
    case "cheapest":
      orderBy = { price: "asc" };
      break;
    case "highest":
      orderBy = { price: "desc" };
      break;
    default:
      orderBy = { createdAt: "desc" };
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

  const where = {
    Card: {
      ...(genre ? { genre: parseInt(genre) } : {}),
      ...(grade ? { grade: parseInt(grade) } : {}),
      ...whereOr,
    },
  };

  const filterOptions = {
    orderBy,
    skip: parseInt(offset),
    take: parseInt(pageSizeNum),
    where,
  };

  return filterOptions;
}

export function createShopListFilterByQuery(query) {
  const { sellout, ...rest } = query;
  const filterOptions = createCardListFilterByQuery(rest);

  if (sellout === "true") {
    filterOptions.where.remainingQuantity = 0;
  } else if (sellout === "false") {
    filterOptions.where.remainingQuantity = { gt: 0 };
  }

  return filterOptions;
}
