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
    const authInfo = await authService.signIn({
      email,
      password,
      session: req.session,
    });

    if (!authInfo) {
      return next(CustomError(40098));
    }

    const { userInfo, session } = authInfo;

    req.session.userId = session.userId;

    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);

        if (err.message.includes("Redis")) {
          return next(CustomError(50350));
        }

        return next(CustomError(50050));
      }

      console.log("Session successfully saved:", req.session);

      return res.status(200).send(userInfo);
    });
  } catch (err) {
    return next(err);
  }
}

async function signOut(req, res, next) {
  try {
    const sessionId = req.session.id;

    await authService.signOut(sessionId);
    req.session.destroy();

    return res.status(200).send();
  } catch (err) {
    return next(err);
  }
}

export default { signIn, signUp, signOut };
