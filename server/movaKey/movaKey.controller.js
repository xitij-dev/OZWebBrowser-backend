// get setting data
exports.index = async (req, res) => {
  try {
    return res
      .status(200)
      .json({
        status: true,
        message: "Success!!",
        key: "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",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: error.message || "Server Error" });
  }
};
