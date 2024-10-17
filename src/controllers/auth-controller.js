import authService from "../services/auth-service.js";
import { createCustomError } from "../lib/custom-error.js";

async function signUp(req, res, next) {
  try {
    const { email, password, nickname } = req.body;
    const result = await authService.signUp({ email, password, nickname });

    return res.status(201).send(result);
  } catch (err) {
    return next(err);
  }
}

async function signIn(req, res, next) {
  try {
    const { email, password } = req.body;
    const userInfo = await authService.signIn({ email, password });

    if (!userInfo) {
      return next(new createCustomError(400));
    }

    req.session.userId = userInfo.id;
    const session = {
      sessionId: req.session.id,
      userId: req.session.userId,
      sessionData: req.session,
    };

    await authService.createSession(session);

    return res.status(200).send(userInfo);
  } catch (err) {
    return next(err);
  }
}

async function signOut(req, res, next) {
  try {
    const sessionId = req.session.id;

    await authService.deleteSession(sessionId);
    req.session.destroy();

    await authService.signOut();

    return res.status(200).send();
  } catch (err) {
    return next(err);
  }
}

export default { signIn, signUp, signOut };
