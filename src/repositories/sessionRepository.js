import prisma from "./prisma";
import { sessionSelect } from "./selector/sessionSelect";

async function createSession({ expires, data }) {
  return prisma.session.create({
    data: { expires, data },
    select: sessionSelect,
  });
}

async function findSession(id) {
  return prisma.session.findUniqueOrThrow({
    where: { id },
    select: sessionSelect,
  });
}

async function deleteSession(id) {
  return prisma.session.delete({ where: { id } });
}

export default { createSession, findSession, deleteSession };
