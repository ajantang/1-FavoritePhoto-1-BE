import prisma from "./prisma.js";
import { sessionSelect } from "../services/selects/session-select.js";

async function findSession(sessionId) {
  return await prisma.session.findUniqueOrThrow({
    where: { id: sessionId },
    select: sessionSelect,
  });
}

async function deleteSession(sessionId) {
  return await prisma.session.delete({ where: { id: sessionId } });
}

async function createData({ data, select }) {
  return await prisma.session.create({ data, select });
}

async function upsertData({ where, update, create, select }) {
  return await prisma.session.upsert({ where, update, create, select });
}

async function findFirstData({ where, select }) {
  return await prisma.session.findFirst({ where, select });
}

async function deleteData(where) {
  await prisma.session.delete({ where });
}

async function deleteManyData(where) {
  await prisma.session.deleteMany({ where });
}

export default {
  findSession,
  deleteSession,
  createData,
  upsertData,
  findFirstData,
  deleteData,
  deleteManyData,
};
