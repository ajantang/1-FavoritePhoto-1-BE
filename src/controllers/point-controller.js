import pointService from "../services/point-service.js";

async function openBox(req, res, next) {
  try {
    const userId = req.session.userId;
    const sessionId = req.session.id;
    const result = await pointService.openBox({ userId, sessionId });

    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
}

async function getLastOpenBoxTime(req, res, next) {
  try {
    const userId = req.session.userId;
    const sessionId = req.session.id;
    const result = await pointService.getLastOpenBoxTime({ userId, sessionId });

    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
}

export default { openBox, getLastOpenBoxTime };
