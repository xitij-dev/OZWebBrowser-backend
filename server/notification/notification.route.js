const express = require("express");
const route = express.Router();

//multer
const multer = require("multer");
const storage = require("../../utl/multer");
const upload = multer({
  storage,
});

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../utl/checkAccess");

//controller
const NotificationController = require("./notification.controller");

//Send Notification for admin panel
route.post(
  `/`,
  upload.single("image"),
  checkAccessWithSecretKey(),
  NotificationController.sendNotification
);

//get notification list
route.get(
  "/list",
  checkAccessWithSecretKey(),
  NotificationController.getNotificationList
);

module.exports = route;
