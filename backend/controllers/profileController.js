const Profile = require("../models/profileModel");

const ProfileDetail = async (req, res) => {
  try {
    const profile = new Profile({
      ...req.body,
      owner: req.user._id,
    });
    await profile.save();
    res.status(201).send(profile);
  } catch (error) {
    res.status(400).send(error);
  }
};

const readprofileDetail = async (req, res) => {
  const userid = req.params.id;

  const profile = await Profile.findOne({ owner: userid });

  try {
    res.status(200).send(profile);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const allProfile = async (req, res) => {
  try {
    const profile = await Profile.find({});
    res.status(200).send(profile);
  } catch (err) {
    res.send(400).send(err);
  }
};

const UpdateProfile = async (req, res) => {
  const userid = req.params.id;

  const profile = await Profile.findOne({ owner: userid });

  if (!profile) {
    throw new Error("profile not found");
  }
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "_id",
    "Name",
    "Education",
    "Email",
    "MobileNo",
    "Passingyear",
    "CompanyName",
    "Image",
    "Type",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (profile[update] = req.body[update]));
    await profile.save();
    res.json(profile);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

module.exports = {
  ProfileDetail,
  readprofileDetail,
  UpdateProfile,
  allProfile,
};
