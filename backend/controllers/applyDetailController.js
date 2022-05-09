const ApplyDetail = require("../models/applyDetail");

const ApplyDetailPost = async (req, res) => {
  const Detail = new ApplyDetail(req.body);
  try {
    await Detail.save();
    res.status(201).send({ msg: "Sucessfully Post Detail" });
  } catch (e) {
    res.status(400).send(e.message);
  }
};
const ApplyDetailRead = async (req, res) => {
  const ids = req.params.id;
  const detail = await ApplyDetail.find({ owner: ids }).populate("Job");
  try {
    res.status(200).send(detail);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const readDetail = async (req, res) => {
  const id = req.params.id;
  const detail = await ApplyDetail.find({ Job: id });
  try {
    res.status(200).send(detail);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = { ApplyDetailPost, readDetail, ApplyDetailRead };
