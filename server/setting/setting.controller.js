const Setting = require("./setting.model");

//create setting
exports.store = async (req, res) => {
  try {
    const setting = new Setting();

    await setting.save();

    return res
      .status(200)
      .json({ status: true, message: "Success!!", setting });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

// get setting data
exports.index = async (req, res) => {
  try {
    const setting = await Setting.findOne({});

    if (!setting)
      return res.status(200).json({ status: false, message: "No data found!" });

    return res
      .status(200)
      .json({ status: true, message: "Success!!", setting });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

// update the setting data
exports.update = async (req, res) => {
  try {
    const setting = await Setting.findById(req.params.settingId);

    if (!setting)
      return res
        .status(200)
        .json({ status: false, message: "Setting data does not Exist!" });

    setting.privacyPolicyLink = req.body.privacyPolicyLink
      ? req.body.privacyPolicyLink
      : setting.privacyPolicyLink;
    setting.privacyPolicyText = req.body.privacyPolicyText
      ? req.body.privacyPolicyText
      : setting.privacyPolicyText;
    await setting.save();

    return res
      .status(200)
      .json({ status: true, message: "Success!!", setting });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};

// handle setting switch
exports.handleSwitch = async (req, res) => {
  try {
    const setting = await Setting.findById(req.params.settingId);

    if (!setting)
      return res
        .status(200)
        .json({ status: false, message: "Setting data does not Exist!" });
    if (req.query.type === "app") {
      setting.isAppActive = !setting.isAppActive;
    }

    await setting.save();

    return res
      .status(200)
      .json({ status: true, message: "Success!!", setting });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};
