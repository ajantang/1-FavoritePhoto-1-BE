import { basicCardMapper } from "../../services/mappers/card-mapper.js";
import { calculateTotalCountByObject } from "../../utils/number-util.js";

export function exchangeMapper(basicSelect) {
  const mappedCard = basicCardMapper(basicSelect);

  return {
    id: basicSelect.id,
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

export function exchangeCreateMapper(basicSelect) {
  const { id, ...rest } = basicCardMapper(basicSelect);

  return {
    id: basicSelect.id,
    description: basicSelect.description,
    ...rest,
  };
}

export function exchangeDecisionMapper(basicSelect) {
  const { id, ...rest } = basicCardMapper(basicSelect);

  return {
    id: basicSelect.id,
    description: basicSelect.description,
    cardId: id,
    ...rest,
  };
}