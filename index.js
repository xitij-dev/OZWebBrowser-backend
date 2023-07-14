const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
app.use(cors());
app.use(express.json());
dotenv.config();
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));
app.use("/storage", express.static(path.join(__dirname, "storage")));

//admin route
const AdminRoute = require("./server/admin/admin.route");
app.use("/admin", AdminRoute);

//Advertisements route
const AdvertisementRoute = require("./server/advertisement/advertisements.route");
app.use("/ad", AdvertisementRoute);
//category route
const CategoryRoute = require("./server/category/category.route");
app.use("/category", CategoryRoute);

//app route
const AppRoute = require("./server/app/app.route");
app.use("/app", AppRoute);

//game route
const GameRoute = require("./server/game/game.route");
app.use("/game", GameRoute);

// dashboard route
const DashboardRoute = require("./server/dashboard/dashboard.route");
app.use("/dashboard", DashboardRoute);

//setting routes
const SettingRoute = require("./server/setting/setting.route");
app.use("/setting", SettingRoute);

//Notification route
const NotificationRoute = require("./server/notification/notification.route");
app.use("/notification", NotificationRoute);

//MovaKey route
const MovaKeyRoute = require("./server/movaKey/movaKey.route");
app.use("/movaKey", MovaKeyRoute);

app.get("/*", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});

//mongodb connection
mongoose.connect(
  `mongodb+srv://${config.MONGODB_USERNAME}:${config.MONGODB_PASSWORD}@cluster0.eugnt.mongodb.net/${config.MONGODB_DB_NAME}`,
  { useunifiedTopology: true, useNewUrlParser: true }
);  // baki

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("MONGO: successfully connected to db");
});

app.listen(config.PORT, () => {
  console.log("Magic happens on port " + config.PORT);
});
