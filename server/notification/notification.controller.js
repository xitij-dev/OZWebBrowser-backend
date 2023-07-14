const Notification = require("./notification.model");

//FCM node
var FCM = require("fcm-node");
var config = require("../../config");
var fcm = new FCM(config.SERVER_KEY);

const dayjs = require("dayjs");

//Send Notification for admin panel
exports.sendNotification = async (req, res) => {
  try {
    const topic = "/topics/OZWEBBROWSER";

    var message = {
      to: topic,

      notification: {
        body: req.body.description,
        title: req.body.title,
        image: config.baseURL + req.file.path,
      },
    };

    const notification = new Notification();

    notification.title = req.body.title;
    notification.description = req.body.description;
    notification.image = config.baseURL + req.file.path;
    notification.date = new Date().toLocaleString();

    await notification.save();

    await fcm.send(message, async (error, response) => {
      if (error) {
        console.log(error, "Something  went wrong!");
        return res.status(200).json({
          status: false,
          message: "Error !",
        });
      } else {
        console.log("Successfully sent with response: ", response);
        res.status(200).json({
          status: true,
          message: "Successfully sent message",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: error.message || "Internal Server Error !",
    });
  }
};

//get notification list
exports.getNotificationList = async (req, res) => {
  try {
    const notification = await Notification.find().sort({ createdAt: -1 });

    let now = dayjs();

    const data = await notification.map((data) => ({
      _id: data._id,
      title: data.title,
      description: data.description,
      image: data.image ? data.image : null,
      time:
        now.diff(new Date(data.date), "hour") <= 24
          ? dayjs(new Date(data.date)).format("hh:mm a")
          : dayjs(new Date(data.date)).format("DD MMM, YYYY"),
    }));

    return res
      .status(200)
      .json({ status: true, message: "Success!!", notification: data });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};
