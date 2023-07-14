//express
const express = require("express");
const router = express.Router();

//multer
const multer = require("multer");
const storage = require("../../utl/multer");
const upload = multer({
  storage,
});

//admin controller
const AdminController = require("./admin.controller");

//admin middleware
const AdminMiddleware = require("../middleware/admin.middleware");

//get admin profile
router.get("/profile", AdminMiddleware, AdminController.getProfile);

//create admin
router.post("/", upload.single("image"), AdminController.store);

//admin login
router.post("/login", AdminController.login);

//update admin profile
router.patch(
  "/",
  upload.single("image"),
  AdminMiddleware,
  AdminController.update
);

//update admin profile Image
router.patch(
  "/updateImage",
  upload.single("image"),
  AdminMiddleware,
  AdminController.updateImage
);

//change admin password
router.put("/", AdminMiddleware, AdminController.updatePassword);

//admin forgot password
router.post("/sendEmail", AdminController.forgotPassword);

//set admin password
router.post("/setPassword/:adminId", AdminController.setPassword);

module.exports = router;
