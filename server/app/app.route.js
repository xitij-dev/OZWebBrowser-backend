//express
const router = require("express").Router();

//multer
const multer = require("multer");
const storage = require("../../utl/multer");
const upload = multer({
  storage,
});

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../utl/checkAccess");

//AppController
const AppController = require("./app.controller");

// get all app for frontend
router.get("/all", checkAccessWithSecretKey(), AppController.index);

// get top app
router.get("/", checkAccessWithSecretKey(), AppController.getApp);

//create app
router.post(
  "/",
  upload.single("icon"),
  checkAccessWithSecretKey(),
  AppController.store
);

//update app
router.patch(
  "/:appId",
  upload.single("icon"),
  checkAccessWithSecretKey(),
  AppController.update
);

//delete app
router.delete("/:appId", checkAccessWithSecretKey(), AppController.destroy);

//isTop switch
router.put("/:appId", checkAccessWithSecretKey(), AppController.isTopToggle);

// get all category by id
router.get( 
  "/categoryWiseApp",
  checkAccessWithSecretKey(),
  AppController.categoryWiseApp
);

module.exports = router;
