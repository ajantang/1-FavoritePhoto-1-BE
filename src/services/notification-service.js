import notificationRepository from "../repositories/notification-repository.js";
import { createOrderBy } from "../utils/query-util.js";
import { notificationSelect } from "../repositories/selects/notification-select.js";
import { myNotificationMapper } from "./mappers/notification-mapper.js";

async function getUserNotification({ userId, query }) {
  const { sort = "recent", pageNum, pageSize } = query;
  const orderBy = createOrderBy(sort);
  const page = pageNum || 1;
  const pageSizeNum = pageSize || 15;
  const offset = (page - 1) * pageSizeNum;
  const skip = parseInt(offset);
  const take = parseInt(pageSizeNum);
  const where = { userId };
  const list = await notificationRepository.findManyByPaginationData({
    orderBy,
    skip,
    take,
    where,
    select: notificationSelect,
  });
  const count = await notificationRepository.countData(where);

  return myNotificationMapper({ list, count });
}

async function checkNotification(id) {
  const where = { id };
  const data = { check: true };

  return await notificationRepository.updateData({
    where,
    data,
    select: notificationSelect,
  });
}
async function deleteNotification(id) {
  const where = { id };

  return await notificationRepository.deleteData(where);
}

export default {
  getUserNotification,
  checkNotification,
  deleteNotification,
};
