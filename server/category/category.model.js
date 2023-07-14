const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    isTop: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
