const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String,
    date: String,
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
