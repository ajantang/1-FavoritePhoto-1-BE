import { GRADE_INFO } from "../constants/grade.js";
import shopRepository from "../repositories/shop-repository.js";
import userRepository from "../repositories/user-repository.js";
import { shopListSelect } from "../services/selects/shop-select.js";

export async function createNotificationMassage({
  idx,
  userId,
  shopId,
  purchaseQuantity,
}) {
  let user;
  console.log(shopId)

  // 상점 카드 정보 확인
  const shop = await shopRepository.findUniqueOrThrowtData({
    where: { id: shopId },
    select: shopListSelect,
  });

  if (userId) {
    // 유저 정보 확인
    user = await userRepository.findUniqueOrThrowtData({
      where: { id: userId },
    });
  }

  const grade = GRADE_INFO[shop.Card.grade];
  const cardName = shop.Card.name;
  const userName = user?.nickname;

  const massage = [
    `${userName}님과의 [${grade}] | ${cardName}]의 포토카드 교환이 성사되었습니다.`,
    `${userName}님과의 [${grade}] | ${cardName}]의 포토카드 교환이 불발되었습니다.`,
    `${userName}님이 [${grade}] | ${cardName}]의 포토카드 교환을 제안했습니다.`,
    `[${grade}] | ${cardName}] ${purchaseQuantity}장을 성공적으로 구매했습니다.`,
    `${userName}님이 [${grade}] | ${cardName}]을 ${purchaseQuantity}장 구매했습니다.`,
    `[${grade}] | ${cardName}]이 품절되었습니다.`,
  ];

  return massage[idx];
}
