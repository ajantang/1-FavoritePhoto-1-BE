import { basicCardMapper } from "../../services/mappers/card-mapper.js";
import { calculateTotalCountByObject } from "../../utils/number-util.js";

export function exchangeMapper(basicSelect) {
  const mappedCard = basicCardMapper(basicSelect);

  return {
    exchangeId: basicSelect.id,
    shopId: basicSelect.shopId,
    description: basicSelect.description,
    ...mappedCard,
  };
}

export function myExchangeListMapper({ counts, list }) {
  const totalCount = calculateTotalCountByObject(counts);
  const mappedList = list.map((item) => {
    return exchangeMapper(item);
  });
  const mappedData = {
    totalCount,
    countsGroupByGrade: counts,
    exchanges: mappedList,
  };

  return mappedData;
}
