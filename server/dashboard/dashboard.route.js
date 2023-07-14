//express
const express = require("express");
const router = express.Router();

//DashboardController
const DashboardController = require("./dashboard.controller");

//checkAccessWithSecretKey
const checkAccessWithSecretKey = require("../../utl/checkAccess");

// get dashboard
router.get("/", checkAccessWithSecretKey(), DashboardController.dashboard);

module.exports = router;
