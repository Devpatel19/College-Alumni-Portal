const Job = require("../models/jobModel");

const JobPost = async (req, res) => {
  const job = new Job({ ...req.body, owner: req.user._id });
  try {
    await job.save();
    res.status(201).send({ msg: "Sucessfully Post job" });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const readallJob = async (req, res) => {
  try {
    const jobtotal = await Job.find({});
    TotalJob = jobtotal.length;
    const jobs = await Job.find({})
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
      .sort({ createdAt: -1 });
    res.status(200).send(jobs);
  } catch (e) {
    res.status(500).send(e);
  }
};

const readJob = async (req, res) => {
  const userid = req.params.id;
  try {
    const jobs = await Job.find({ owner: userid });

    res.status(200).send(jobs);
  } catch (e) {
    res.status(500).send(e);
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id });

    if (!job) {
      res.status(404).send();
    }

    res.send(job);
  } catch (e) {
    res.status(500).send();
  }
};

const EditJob = async (req, res) => {
  const userid = req.params.id;
  const job = await Job.findById(userid);
  if (!job) {
    throw new Error("job not found");
  }
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "_id",
    "CompanyName",
    "Role",
    "Experience",
    "City",
    "RequireSkill",
    "Salary",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (job[update] = req.body[update]));
    await job.save();
    res.json("Updated");
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = { JobPost, readallJob, readJob, deleteJob, EditJob };
