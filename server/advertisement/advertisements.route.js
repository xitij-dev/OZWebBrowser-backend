//express
const router = require("express").Router();

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../utl/checkAccess");

const AdvertisementController = require("./advertisements.controller");

router.get("/", checkAccessWithSecretKey(), AdvertisementController.index);
router.post("/", checkAccessWithSecretKey(), AdvertisementController.store);
router.patch(
  "/:adId",
  checkAccessWithSecretKey(),
  AdvertisementController.update
);
router.put(
  "/:adId",
  checkAccessWithSecretKey(),
  AdvertisementController.googleAdd
);
router.put(
  "/appAdOnOff/:adId",
  checkAccessWithSecretKey(),
  AdvertisementController.appAdd
);

router.put(
  "/appAdOn/:adId",
  checkAccessWithSecretKey(),
  AdvertisementController.appAddOn
);

router.put(
  "/appExit/:adId",
  checkAccessWithSecretKey(),
  AdvertisementController.appExitAdd
);

module.exports = router;
