import prisma from "../repositories/prisma.js";
import pointRepository from "../repositories/last-box-time-repository.js";
import userRepository from "../repositories/user-repository.js";
import sessionRepository from "../repositories/session-repository.js";
import { hasTimeElapsed, getCurrentTime } from "../utils/time-util.js";
import { myPointMapper } from "./mappers/box-mapper.js";
import { userSelect } from "./selects/user-select.js";

import { MIN_BOX_POINT, MAX_BOX_POINT } from "../constants/box.js";

async function openBox({ userId, sessionId }) {
  const where = { id: userId };
  const lastBoxTimeData = await pointRepository.findFirstData({
    where,
    select: { updatedAt: true },
  });
  const sessionWhere = { id: sessionId };
  const lastSignInTimeData = await sessionRepository.findFirstData({
    where: sessionWhere,
    select: { createdAt: true },
  });
  const currentTimeData = getCurrentTime(
    lastBoxTimeData.updatedAt,
    lastSignInTimeData.createdAt
  );
  const success = hasTimeElapsed(currentTimeData);

  if (success) {
    return prisma.$transaction(async () => {
      const earnedPoint =
        Math.floor(Math.random() * MAX_BOX_POINT) + MIN_BOX_POINT;
      const where = { id: userId };
      const data = {
        point: {
          increment: earnedPoint,
        },
      };
      const userInfo = await userRepository.updateData({
        where,
        data,
        select: userSelect,
      });
      const pointUpdateWhere = { id: userId };
      const pointUpdateDate = { updatedAt: new Date() };

      await pointRepository.updateData({
        where: pointUpdateWhere,
        data: pointUpdateDate,
        select: { updatedAt: true },
      });

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

async function getLastOpenBoxTime({ userId, sessionId }) {
  const where = { id: userId };
  const lastBoxTimeData = await pointRepository.findFirstData({
    where,
    select: { updatedAt: true },
  });
  const sessionWhere = { id: sessionId };
  const lastSignInTimeData = await sessionRepository.findFirstData({
    where: sessionWhere,
    select: { createdAt: true },
  });
  const currentTimeData = getCurrentTime(
    lastBoxTimeData.updatedAt,
    lastSignInTimeData.createdAt
  );
  const success = hasTimeElapsed(currentTimeData);
  const now = new Date();
  const timeDifference = now - currentTimeData;

  return { timeDifference, success };
}

export default { openBox, getLastOpenBoxTime };
