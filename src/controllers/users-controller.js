import userService from "../services/user-service.js";
import { myCardMapper } from "./mappers/card-mapper.js";

async function getMyCardList(req, res, next) {
  try {
    const result = await userService.getMyCardList(req.session.userId);

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

// async function getMyShopList(req, res, next){
//   try{
//     const result = ;
//     return res.status(200).send(result);
//   }catch(err){
//     return next(err);
//   }
// }

// async function getMyRequestList(req, res, next){
//   try{
//     const result = ;
//     return res.status(200).send(result);
//   }catch(err){
//     return next(err);
//   }
// }

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
  createMyCard,
};
