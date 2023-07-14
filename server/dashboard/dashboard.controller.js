const Category = require("../category/category.model");
const App = require("../app/app.model");
const Game = require("../game/game.model");

exports.dashboard = async (req, res) => {
  try {
    const totalCategories = await Category.find().countDocuments();
    const totalApps = await App.find().countDocuments();
    const totalGames = await Game.find().countDocuments();

    const dashboard = {
      totalCategories,
      totalApps,
      totalGames,
    };

    return res
      .status(200)
      .json({ status: true, message: "Success!!", dashboard });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};
