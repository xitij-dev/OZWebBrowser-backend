const mongoose = require("mongoose");
const appSchema = new mongoose.Schema(
  {
    name: String,
    icon: String,
    URL: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    isTop: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("App", appSchema);
