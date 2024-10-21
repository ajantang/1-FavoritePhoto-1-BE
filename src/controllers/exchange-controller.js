import exchangeService from "../services/exchange-servic.jse";

async function acceptByExchange(req, res, next) {
  const userId = req.session.userId;
  const { exchangeId } = req.params;
  const accept = await exchangeService.acceptByExchange(
    userId,
    exchangeId,
    req.body
  );
}
