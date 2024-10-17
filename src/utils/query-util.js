export function createCardListFilterByQuery(query) {
  const {
    sort,
    genre,
    grade,
    sellout,
    pageNum,
    pageSize,
    keyword = "",
  } = query;

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

  let selloutWhere = null;
  if (sellout === "true") {
    selloutWhere = { quantity: 0 };
  } else if (sellout === "false") {
    selloutWhere = { quantity: { gt: 0 } };
  }

  const where = {
    Card: {
      ...(genre ? { genre: parseInt(genre) } : {}),
      ...(grade ? { grade: parseInt(grade) } : {}),
      ...whereOr,
    },
    ...(selloutWhere && selloutWhere),
  };

  const filterOptions = {
    orderBy,
    skip: parseInt(offset),
    take: parseInt(pageSizeNum),
    where,
  };

  return filterOptions;
}
