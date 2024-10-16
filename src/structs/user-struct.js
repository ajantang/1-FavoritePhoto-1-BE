import { object, refine, size, string } from "superstruct";

import user from "../constants/user";
import { emailPattern } from "./patterns/pattern";

export const User = object({
  email: refine(
    emailPattern,
    "Email Length",
    (value) =>
      user.EMAIL_MIN_LENGTH <= value.length &&
      value.length <= user.EMAIL_MAX_LENGTH
  ),
  nickname: size(string(), user.NICKNAME_MIN_LENGTH, user.NICKNAME_MAX_LENGTH),
  password: size(string(), user.PASSWORD_MIN_LENGTH, user.PASSWORD_MAX_LENGTH),
});
