import prisma from "../repositories/prisma.js";
import pointRepository from "../repositories/last-box-time-repository.js";
import userRepository from "../repositories/user-repository.js";
import { hasTimeElapsed } from "../utils/time-util.js";
import { myPointMapper } from "./mappers/box-mapper.js";
import { userSelect } from "./selects/user-select.js";

import { MIN_BOX_POINT, MAX_BOX_POINT } from "../constants/box.js";

async function openBox(userId) {
  const lastBoxTimeData = await pointRepository.findLastBoxTime(userId);
  const success = hasTimeElapsed(lastBoxTimeData.updatedAt);

  if (success) {
    return prisma.$transaction(async () => {
      const earnedPoint =
        Math.floor(Math.random() * MAX_BOX_POINT) + MIN_BOX_POINT;
      const userInfo = await userRepository.increaseUserPoint({
        id: userId,
        earnedPoint,
      });
      await pointRepository.updateLastBoxTime(userId);

      return myPointMapper({
        id: userId,
        success,
        earnedPoint,
        point: userInfo.point,
      });
    });
  }

  const userInfo = await userRepository.findFirstData({
    where: { id: userId },
    select: userSelect,
  });

  return myPointMapper({
    id: userId,
    success,
    earnedPoint: 0,
    point: userInfo.point,
  });
}

async function getLastOpenBoxTime(userId) {
  const lastBoxTimeData = await pointRepository.findLastBoxTime(userId);
  const success = hasTimeElapsed(lastBoxTimeData.updatedAt);
  const now = new Date();
  const timeDifference = now - lastBoxTimeData.updatedAt;

  return { timeDifference, success };
}

async function createNewBoxTime(userId) {
  await pointRepository.createLastBoxTime(userId);
}

export default { openBox, getLastOpenBoxTime, createNewBoxTime };
