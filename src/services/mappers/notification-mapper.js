export function myNotificationMapper({ list, count }) {
  const now = new Date();
  const notifications = list.map((item) => {
    const timeDifference = now - item.createdAt;

    return {
      id: item.id,
      shopId: item.shopId,
      message: item.message,
      check: item.check,
      timeDifference,
    };
  });
  return { totalCount: count, notifications };
}
