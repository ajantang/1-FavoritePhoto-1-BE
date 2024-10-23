import authService from "../services/auth-service.js";
import { CustomError } from "../lib/custom-error.js";

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

    const { userInfo, session } = await authService.signIn({
      email,
      password,
      session: req.session,
    });

    if (!userInfo) {
      return CustomError(40098);
    }

    req.session = session;

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
