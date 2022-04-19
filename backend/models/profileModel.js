const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const profileSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Education: {
      type: String,
      trim: true,
    },
    Image: {
      type: String,
    },
    MobileNo: {
      type: Number,
      unique: true,
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    Passingyear: {
      type: Number,
      trim: true,
    },
    CompanyName: {
      type: String,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    Type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

profileSchema.methods.generateAuthToken = async function () {
  const profile = this;
  const token = jwt.sign({ _id: profile._id.toString() }, "thisismyDemocourse");
  await profile.save();

  return token;
};

profileSchema.pre("save", async function (next) {
  const profile = this;
  next();
});

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
