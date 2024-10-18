import userService from "../services/user-service.js";

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
      userId: req.session.userId,
      quantity,
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

async function getMyRequestList(req, res, next) {
  try {
    const userId = req.session.userId;
    const query = req.query;
    const result = await userService.getMyRequestList({ userId, query });

    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
}

// async function getMyProfile(req, res, next){
//   try{
//     const result = ;
//     return res.status(200).send(result);
//   }catch(err){
//     return next(err);
//   }
// }

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
  getMyRequestList,
};
