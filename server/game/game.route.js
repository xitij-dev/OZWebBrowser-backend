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

//GameController
const GameController = require("./game.controller");

// get all game for frontend
router.get("/all", checkAccessWithSecretKey(), GameController.index);

//create game
router.post(
  "/",
  upload.single("icon"),
  checkAccessWithSecretKey(),
  GameController.store
);

//update game
router.patch(
  "/:gameId",
  upload.single("icon"),
  checkAccessWithSecretKey(),
  GameController.update
);

//delete game
router.delete("/:gameId", checkAccessWithSecretKey(), GameController.destroy);

module.exports = router;
