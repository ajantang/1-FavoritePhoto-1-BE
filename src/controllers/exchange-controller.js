import exchangeService from "../services/exchange-service.js";

async function acceptByExchange(req, res, next) {
  try {
    const userId = req.session.userId;
    const { exchangeId } = req.params;
    const acceptExchange = await exchangeService.acceptByExchange(
      userId,
      exchangeId,
      req.body
    );

    res.send(acceptExchange);
  } catch (err) {
    return next(err);
  }
}

async function refuseOrCancelExchange(req, res, next) {
  try {
    const { exchangeId } = req.params;
    const refuseExchange = await exchangeService.refuseOrCancelExchange(
      exchangeId,
      req.body
    );

    res.send(refuseExchange);
  } catch (err) {
    return next(err);
  }
}

export default {
  acceptByExchange,
  refuseOrCancelExchange,
};
