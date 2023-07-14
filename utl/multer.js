const multer = require("multer");

module.exports = multer.diskStorage({
  filename: function (req, file, callback) {
    const filename =
      Date.now() + Math.floor(Math.random() * 100) + file.originalname;
    callback(null, filename);
  },
  destination: function (req, file, callback) {
    callback(null, "storage");
  },
});
