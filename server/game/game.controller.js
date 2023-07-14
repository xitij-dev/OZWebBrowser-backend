//Game Model
const Game = require("./game.model");

//deleteFile
const { deleteFile } = require("../../utl/deleteFile");

//fs
const fs = require("fs");

//create game
exports.store = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(200)
        .json({ status: false, message: "Invalide details" });
    }
    const game = new Game({
      name: req.body.name,
      icon: req.file.path,
      URL: req.body.URL,
      rating: req.body.rating,
    });
    await game.save();
    return res.status(200).json({ status: true, message: "success!!", game });
  } catch (error) {
    console.log(error);
    deleteFile(req.file);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//get all game for frontend
exports.index = async (req, res) => {
  try {
    const game = await Game.find().sort({ createdAt: -1 });

    if (!game)
      return res.status(200).json({ status: false, message: "No data found!" });

    return res.status(200).json({ status: true, message: "Success!!", game });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//update game
exports.update = async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) {
      deleteFile(req.file);
      return res
        .status(200)
        .json({ status: false, message: "Game does not exist" });
    }
    if (req.file) {
      if (fs.existsSync(game.icon)) {
        fs.unlinkSync(game.icon);
      }
      game.icon = req.file.path;
    }

    game.name = req.body.name;
    game.URL = req.body.URL;
    game.rating = req.body.rating;

    await game.save();
    return res.status(200).json({ status: true, message: "success!!", game });
  } catch (error) {
    console.log(error);
    deleteFile(req.file);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

//delete game
exports.destroy = async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId);
    if (!game) {
      return res
        .status(200)
        .json({ status: false, message: "Game does not exist" });
    }
    if (fs.existsSync(game.image)) {
      fs.unlinkSync(game.image);
    }
    await game.deleteOne();
    return res.status(200).json({ status: true, message: "success!!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};
