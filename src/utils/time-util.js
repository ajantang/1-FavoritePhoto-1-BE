import { KEEPING_SESSION_TIME } from "../constants/box.js";

export function hasTimeElapsed(lastTime) {
  const now = new Date();
  const timeDifference = now - lastTime;

  return timeDifference >= KEEPING_SESSION_TIME;
}

export function getCurrentTime(time1, time2) {
  return time1 - time2 > 0 ? time1 : time2;
}
