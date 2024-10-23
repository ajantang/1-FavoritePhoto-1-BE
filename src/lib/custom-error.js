import { CUSTOM_ERROR_INFO } from "../constants/error.js";

export function CustomError(status) {
  const err = new Error(CUSTOM_ERROR_INFO[status]);
  err.status = Math.floor(status / 100);
  return err;
}
