//App Model
const App = require("./app.model");

//Category Model
const Category = require("../category/category.model");

//deleteFile
const { deleteFile } = require("../../utl/deleteFile");

//fs
const fs = require("fs");

//create app
exports.store = async (req, res) => {
  try {
    if (!req.file || !req.body.category) {
      return res
        .status(200)
        .json({ status: false, message: "Invalide details" });
    }
    const category = await Category.findById(req.body.category);
    if (!category)
      return res
        .status(200)
        .json({ status: false, message: "Category does not Exist!" });
    const app = new App({
      name: req.body.name,
      icon: req.file.path,
      URL: req.body.URL,
      category: category._id,
    });
    await app.save();
    const data = await App.findById(app._id).populate("category", "name");

    return res
      .status(200)
      .json({ status: true, message: "success!!", app: data });
  } catch (error) {
    console.log(error);
    deleteFile(req.file);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//get all app for frontend
exports.index = async (req, res) => {
  try {
    const app = await App.find().populate("category").sort({ createdAt: -1 });

    if (!app)
      return res.status(200).json({ status: false, message: "No data found!" });

    return res.status(200).json({ status: true, message: "Success", app });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//update app
exports.update = async (req, res) => {
  try {
    if (!req.params.appId) {
      return res
        .status(200)
        .json({ status: false, message: "Invalid Details !" });
    }

    const app = await App.findById(req.params.appId);

    if (!app) {
      deleteFile(req.file);
      return res
        .status(200)
        .json({ status: false, message: "App does not exists !" });
    }

    let category;
    if (req.body.category) {
      category = await Category.findById(req.body.category);

      if (!category) {
        return res
          .status(200)
          .json({ status: false, message: "Category does not exist !" });
      }
    }

    if (req.file) {
      app.icon = req.file.path;
    }

    app.name = req.body.name;
    app.URL = req.body.URL;
    app.category = category._id;

    await app.save();

    const appData = await App.findById(app._id).populate("category");

    return res
      .status(200)
      .json({ status: true, message: "Category Updated !", app: appData });
  } catch (error) {
    deleteFile(req.file);
    return res.status(500).json({
      status: false,
      error: error.message || "Internal Server Error !",
    });
  }
};

//delete app
exports.destroy = async (req, res) => {
  try {
    const app = await App.findById(req.params.appId);
    if (!app) {
      return res
        .status(200)
        .json({ status: false, message: "App does not exist" });
    }
    if (fs.existsSync(app.icon)) {
      fs.unlinkSync(app.icon);
    }
    await app.deleteOne();
    return res.status(200).json({ status: true, message: "success!!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//set app to Top
exports.isTopToggle = async (req, res, next) => {
  try {
    const app = await App.findById(req.params.appId).populate(
      "category",
      "name"
    );

    if (!app)
      return res
        .status(200)
        .json({ status: false, message: "App does not Exist!" });

    app.isTop = !app.isTop;
    await app.save();

    return res
      .status(200)
      .json({ status: true, message: "Success!", data: app });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

// get categorywise App
exports.categoryWiseApp = async (req, res) => {
  try {
    const category = await Category.findById(req.query.categoryId);
    if (!category)
      return res
        .status(200)
        .json({ status: false, message: "Category not found" });
    const app = await App.find({ category: category._id })
      .populate("category")
      .sort({ createdAt: -1 });

    if (!app)
      return res.status(200).json({ status: false, message: "No data found!" });

    //[data off]
    return res
      .status(200)
      .json({ status: true, message: "Success!!", app });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//get all top app
exports.getApp = async (req, res) => {
  try {
    if (!req.query.type)
      return res
        .status(200)
        .json({ status: false, message: "Invalid Details!" });
    let app;
    if (req.query.type === "Top") {
      app = await App.find({ isTop: true }).sort({
        updatedAt: 1,
      });
    } else {
      app = await App.find({ isTop: false }).sort({
        updatedAt: 1,
      });
    }

    //[data off]
    return res
      .status(200)
      .json({ status: true, message: "Success!!", app });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};
