const mongoose = require("mongoose");
const gameSchema = new mongoose.Schema(
  {
    name: String,
    icon: String,
    URL: String,
    rating: { type: Number, default: 0 },
    isTop: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Game", gameSchema);
