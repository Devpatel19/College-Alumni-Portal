const express = require("express");
const User = require("../models/userModel");
const { auth } = require("../Middleware/authMiddleware");
const Event = require("../models/eventModel");
const Job = require("../models/jobModel");
const Profile = require("../models/profileModel");

const router = express.Router();

router.get("/length", auth, async (req, res) => {
  try {
    const users = await User.find({});
    TotalUser = users.length;

    const student = await User.find({ type: "Student" });
    TotalStudent = student.length;

    const alumni = await User.find({ type: "Alumni" });
    TotalAlumni = alumni.length;

    const event = await Event.find({});
    TotalEvent = event.length;

    const job = await Job.find({});
    TotalJob = job.length;

    const profile = await Profile.find({});

    res.send({
      TotalUser,
      TotalStudent,
      TotalAlumni,
      TotalEvent,
      TotalJob,
      profile,
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
