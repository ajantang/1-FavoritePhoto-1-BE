import notificationService from "../services/notification-service.js";

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
  checkNotification,
  deleteNotification,
};
