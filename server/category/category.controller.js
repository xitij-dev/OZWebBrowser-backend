//Category Model
const Category = require("./category.model");

//DeleteFile
const { deleteFile } = require("../../utl/deleteFile");

//fs
const fs = require("fs");

//create category
exports.store = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(200)
        .json({ status: false, message: "Invalide details" });
    }
    const category = new Category({
      image: req.file.path,
      name: req.body.name,
    });
    await category.save();
    return res
      .status(200)
      .json({ status: true, message: "success!!", category });
  } catch (error) {
    console.log(error);
    deleteFile(req.file);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//get all category for frontend
exports.index = async (req, res) => {
  try {
    const category = await Category.find().sort({ createdAt: -1 });

    if (!category)
      return res.status(200).json({ status: false, message: "No data found!" });

    return res
      .status(200)
      .json({ status: true, message: "Success!!", category });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//update category
exports.update = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      deleteFile(req.file);
      return res
        .status(200)
        .json({ status: false, message: "Category does not exist" });
    }
    if (req.file) {
      if (fs.existsSync(category.image)) {
        fs.unlinkSync(category.image);
      }
      category.image = req.file.path;
    }

    category.name = req.body.name;

    await category.save();
    return res
      .status(200)
      .json({ status: true, message: "success!!", category });
  } catch (error) {
    console.log(error);
    deleteFile(req.file);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//delete category
exports.destroy = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res
        .status(200)
        .json({ status: false, message: "Category does not exist" });
    }
    if (fs.existsSync(category.image)) {
      fs.unlinkSync(category.image);
    }
    await category.deleteOne();
    return res.status(200).json({ status: true, message: "success!!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//set category to Top
exports.isTopToggle = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);

    if (!category)
      return res
        .status(200)
        .json({ status: false, message: "Category does not Exist!" });

    category.isTop = !category.isTop;
    await category.save();

    return res
      .status(200)
      .json({ status: true, message: "Success!", data: category });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//get top category
exports.getCategory = async (req, res) => {
  try {
    if (!req.query.type)
      return res
        .status(200)
        .json({ status: false, message: "Invalid Details!" });
    let category;
    if (req.query.type === "Top") {
      category = await Category.find({ isTop: true }).sort({
        updatedAt: 1,
      });
    } else {
      category = await Category.find({ isTop: false }).sort({
        updatedAt: 1,
      });
    }

    return res
      .status(200)
      .json({ status: true, message: "Success!!", category });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};
