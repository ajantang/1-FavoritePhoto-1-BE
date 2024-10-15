import prisma from "./prisma";
import { sessionSelect } from "./selects/session-select";

async function createSession({ sessionId, userId, expires, data }) {
  const jsonData = JSON.stringify(data);

  return prisma.session.create({
    data: { id: sessionId, userId, expires, data: jsonData },
    select: sessionSelect,
  });
}

async function findSession(sessionId) {
  return prisma.session.findUniqueOrThrow({
    where: { id: sessionId },
    select: sessionSelect,
  });
}

async function deleteSession(sessionId) {
  return prisma.session.delete({ where: { sessionId } });
}

export default { createSession, findSession, deleteSession };
