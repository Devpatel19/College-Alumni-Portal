const Event = require("../models/eventModel");

const EventPost = async (req, res) => {
  try {
    const job = new Event(req.body);
    await job.save();
    res.send("Image upload successfully");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const ReadallEvent = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).send(events);
  } catch (e) {
    res.status(404).send();
  }
};

const eventdelete = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id });

    if (!event) {
      res.status(404).send();
    }

    res.send(event);
  } catch (e) {
    res.status(500).send("delete successfully");
  }
};

const Editevent = async (req, res) => {
  const userid = req.params.id;

  const event = await Event.findById(userid);

  if (!event) {
    throw new Error("job not found");
  }
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "_id",
    "ImageLocation",
    "Description",
    "Name",
    "Date",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (event[update] = req.body[update]));
    await event.save();
    res.json("Updated");
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = { EventPost, ReadallEvent, eventdelete, Editevent };
