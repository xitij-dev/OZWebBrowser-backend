const Advertisement = require("./advertisements.model");

exports.index = async (req, res) => {
  try {
    const advertisements = await Advertisement.findOne({});
    return res
      .status(200)
      .json({ status: true, message: "Success", advertisements });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: error.message || "Server Error" });
  }
};

exports.store = async (req, res) => {
  try {
    const advertisements = new Advertisement();
    await advertisements.save();

    return res
      .status(200)
      .json({ status: true, message: "Success", advertisements });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: error.message || "Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    const advertisements = await Advertisement.findById(req.params.adId);
    if (!advertisements)
      return res.status(200).json({
        status: false,
        message: "Add not Found",
      });

    advertisements.native = req.body.native
      ? req.body.native
      : advertisements.native;
    advertisements.reward = req.body.reward
      ? req.body.reward
      : advertisements.reward;
    advertisements.banner = req.body.banner
      ? req.body.banner
      : advertisements.banner;
    advertisements.interstitial = req.body.interstitial
      ? req.body.interstitial
      : advertisements.interstitial;
    advertisements.nativeIos = req.body.nativeIos
      ? req.body.nativeIos
      : advertisements.nativeIos;
    advertisements.rewardIos = req.body.rewardIos
      ? req.body.rewardIos
      : advertisements.rewardIos;
    advertisements.bannerIos = req.body.bannerIos
      ? req.body.bannerIos
      : advertisements.bannerIos;
    advertisements.interstitialIos = req.body.interstitialIos
      ? req.body.interstitialIos
      : advertisements.interstitialIos;
    await advertisements.save();

    return res.status(200).json({
      status: true,
      message: "Success",
      advertisement: advertisements,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: error.message || "Server Error" });
  }
};

exports.googleAdd = async (req, res) => {
  try {
    const advertisements = await Advertisement.findById(req.params.adId);
    if (!advertisements)
      return res.status(200).json({
        status: false,
        message: "Add not Found",
      });
    advertisements.isGoogleAd = !advertisements.isGoogleAd;

    await advertisements.save();

    return res
      .status(200)
      .json({ status: true, message: "success", advertisements });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: error.message || "Server Error" });
  }
};

exports.appAdd = async (req, res) => {
  try {
    const advertisements = await Advertisement.findById(req.params.adId);
    if (!advertisements)
      return res.status(200).json({
        status: false,
        message: "Add not Found",
      });

    advertisements.isAppAdOnOff = !advertisements.isAppAdOnOff;
    if (advertisements.isAppAdOnOff === true) {
      advertisements.isAppAdOn = false;
    } else {
      advertisements.isAppAdOn = true;
    }

    await advertisements.save();

    return res
      .status(200)
      .json({ status: true, message: "success", advertisements });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: error.message || "Server Error" });
  }
};

exports.appAddOn = async (req, res) => {
  try {
    const advertisements = await Advertisement.findById(req.params.adId);
    if (!advertisements)
      return res.status(200).json({
        status: false,
        message: "Add not Found",
      });
    if (advertisements.isAppAdOnOff === true) {
      advertisements.isAppAdOn = false;
    } else {
      advertisements.isAppAdOn = !advertisements.isAppAdOn;
    }

    await advertisements.save();

    return res
      .status(200)
      .json({ status: true, message: "success", advertisements });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: error.message || "Server Error" });
  }
};

exports.appExitAdd = async (req, res) => {
  try {
    const advertisements = await Advertisement.findById(req.params.adId);
    if (!advertisements)
      return res.status(200).json({
        status: false,
        message: "Add not Found",
      });
    advertisements.isAppExit = !advertisements.isAppExit;

    await advertisements.save();

    return res
      .status(200)
      .json({ status: true, message: "success", advertisements });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: error.message || "Server Error" });
  }
};
