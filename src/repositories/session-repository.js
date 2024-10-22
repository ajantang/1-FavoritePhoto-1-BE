import prisma from "./prisma.js";
import { sessionSelect } from "../services/selects/session-select.js";

async function createSession({ sessionId, userId, expires, data }) {
  const jsonData = JSON.stringify(data);

  return await prisma.session.create({
    data: { id: sessionId, userId, expires, data: jsonData },
    select: sessionSelect,
  });
}

async function findSession(sessionId) {
  return await prisma.session.findUniqueOrThrow({
    where: { id: sessionId },
    select: sessionSelect,
  });
}

async function deleteSession(sessionId) {
  return await prisma.session.delete({ where: { id: sessionId } });
}

export default { createSession, findSession, deleteSession };
