import exchangeService from "../services/exchange-service.js";

async function acceptByExchange(req, res, next) {
  const userId = req.session.userId;
  const { exchangeId } = req.params;
  const acceptExchange = await exchangeService.acceptByExchange(
    userId,
    exchangeId,
    req.body
  );
  res.send(acceptExchange);
}

async function refuseByExchange(req, res, next) {
  const { exchangeId } = req.params;
  const refuseExchange = await exchangeService.refuseByExchange(
    exchangeId,
    req.body
  );
  res.send(refuseExchange);
}

export default {
  acceptByExchange,
  refuseByExchange,
};
