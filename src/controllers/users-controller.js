import userService from "../services/user-service.js";
import notificationService from "../services/notification-service.js";

async function getMyCardList(req, res, next) {
  try {
    const userId = req.session.userId;
    const query = req.query;
    const result = await userService.getMyCardList({ userId, query });

    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
}

async function getMyCard(req, res, next) {
  try {
    const { cardId } = req.params;
    const userId = req.session.userId;
    const result = await userService.getMyCard({ userId, cardId });

    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
}

async function createMyCard(req, res, next) {
  try {
    const { name, description, image, grade, genre, price, quantity } =
      req.body;

    const result = await userService.createMyCard({
      name,
      description,
      image,
      grade,
      genre,
      price,
      quantity,
      userId: req.session.userId,
    });

    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
}

async function getMyShopList(req, res, next) {
  try {
    const userId = req.session.userId;
    const query = req.query;
    const result = await userService.getMyShopList({ userId, query });

    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
}

async function getMyExchangeList(req, res, next) {
  try {
    const userId = req.session.userId;
    const query = req.query;
    const result = await userService.getMyExchangeList({ userId, query });

    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
}

async function getMyInfo(req, res, next) {
  try {
    const userId = req.session.userId;
    const result = await userService.getMyInfo(userId);

    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
}

async function getMyNotificationList(req, res, next) {
  try {
    const userId = req.session.userId;
    const query = req.query;
    const result = await notificationService.getUserNotification({
      userId,
      query,
    });

    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
}
// async function checkValidateEmail(req, res, next){
//   try{
//     const result = ;
//     return res.status(200).send(result);
//   }catch(err){
//     return next(err);
//   }
// }

// async function checkValidateNickname(req, res, next){
//   try{
//     const result = ;
//     return res.status(200).send(result);
//   }catch(err){
//     return next(err);
//   }
// }

export default {
  getMyCardList,
  getMyCard,
  createMyCard,
  getMyShopList,
  getMyExchangeList,
  getMyInfo,
  getMyNotificationList,
};
