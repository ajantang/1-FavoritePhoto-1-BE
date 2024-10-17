import ownService from "../services/ownService.js";
import shopService from "../services/shopService.js";
import { createShopMapper, getShopListMapper } from "./mappers/shopMapper.js";

async function createShop(req, res, next) {
  const shop = await shopService.createShop(req.body);
  const own = await ownService.update(req.body);
  const [shopResult, ownResult] = await Promise.all([shop, own]);
  const responseData = createShopMapper(shopResult);
  res.status(201).send(responseData);
}

async function getShopList(req, res, next) {
  const shops = await shopService.getShopListByQuery(req.query);
  const count = await shopService.countShopListByQuery(req.query);
  const [list, total] = await Promise.all([shops, count]);
  const responseData = getShopListMapper(list, total);
  res.send(responseData);
}

async function getShopDetail(req, res, next) {
  const { id } = req.params;
  const { userId } = req.body; // 인증 후 req.body에 userId 추가
  const shop = await shopService.getShopDetailById(id); // 상세정보 가져오기
  const isUserShopOwner = await shopService.checkUserShopOwner(userId, id); // 유저가 만든건지 확인
  if (!isUserShopOwner) { //없으면 교환을 제시했는지 확인
    // 로그인한 유저가 해당 상품에 교환을 신청했는지 확인하는 코드 필요(상품 아이디와 유저아이디 이용 exchange에서)
  }
  // res mapping하는 코드 필요
  res.send();
}

export default { createShop, getShopList, getShopDetail };
