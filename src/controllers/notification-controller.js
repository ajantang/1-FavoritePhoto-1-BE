import notificationService from "../services/notification-service.js";

async function getUserNotification(req, res, next) {
  try {
    const userId = req.session.userId;
    const query = req.query;
    const result = await notificationService.getUserNotification({
      userId,
      query,
    });

    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
}

async function checkNotification(req, res, next) {
  try {
    const { notificationId } = req.params;
    const result = await notificationService.checkNotification(notificationId);

    return res.status(200).send(result);
  } catch (err) {
    return next(err);
  }
}

async function deleteNotification(req, res, next) {
  try {
    const { notificationId } = req.params;
    await notificationService.deleteNotification(notificationId);

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

export default {
  getUserNotification,
  checkNotification,
  deleteNotification,
};
