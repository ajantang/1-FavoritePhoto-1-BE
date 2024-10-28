import { object, refine, size, string } from "superstruct";

import user from "../constants/user.js";
import { emailPattern } from "./patterns/pattern.js";

export const SignUpUser = object({
  email: refine(
    emailPattern,
    "email",
    (value) =>
      user.EMAIL_MIN_LENGTH <= value.length &&
      value.length <= user.EMAIL_MAX_LENGTH
  ),
  nickname: size(string(), user.NICKNAME_MIN_LENGTH, user.NICKNAME_MAX_LENGTH),
  password: size(string(), user.PASSWORD_MIN_LENGTH, user.PASSWORD_MAX_LENGTH),
});

export const SignInUser = object({
  email: refine(
    emailPattern,
    "email",
    (value) =>
      user.EMAIL_MIN_LENGTH <= value.length &&
      value.length <= user.EMAIL_MAX_LENGTH
  ),
  password: size(string(), user.PASSWORD_MIN_LENGTH, user.PASSWORD_MAX_LENGTH),
});
