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

//CategoryController
const CategoryController = require("./category.controller");

// get all category for frontend
router.get("/all", checkAccessWithSecretKey(), CategoryController.index);

// get top category
router.get("/", checkAccessWithSecretKey(), CategoryController.getCategory);

//create category
router.post(
  "/",
  upload.single("image"),
  checkAccessWithSecretKey(),
  CategoryController.store
);

//update category
router.patch(
  "/:categoryId",
  upload.single("image"),
  checkAccessWithSecretKey(),
  CategoryController.update
);

//delete category
router.delete(
  "/:categoryId",
  checkAccessWithSecretKey(),
  CategoryController.destroy
);

//isTop switch
router.put(
  "/:categoryId",
  checkAccessWithSecretKey(),
  CategoryController.isTopToggle
);

module.exports = router;
