const User = require("../models/userModel");
const { VerifyUserWhen } = require("../emails/account");
const { emailsend } = require("../emails/account");
const OtP = require("../models/otpModel");

const Register = async (req, res) => {
  const user = new User(req.body);
  try {
    const emails = await User.findOne({ email: req.body.email });

    if (emails) {
      throw new Error("Email already exists");
    }

    const mobile = await User.findOne({ mobileNo: req.body.mobileNo });
    if (mobile) {
      throw new Error("Mobile No already exists");
    }

    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const Login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    if (user.type !== req.body.type) {
      throw new Error("Login Types is not valid");
    }
    if (user.verify === false) {
      throw new Error("please wait sometime admin can not verify it ");
    }
    const token = await user.generateAuthToken();

    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      type: user.type,
      mobileNo: user.mobileNo,
      isProfileUpdate: user.isProfileUpdate,
      token,
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const Alluser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.send(400).send(e);
  }
};

const generateOTP = () => {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const ForgotPassword = async (req, res) => {
  try {
    const user = await User.find({ email: req.body.email });

    if (user.length === 0) {
      throw new Error("user is not Register with this email");
    }
    const otp = generateOTP();
    const otps = new OtP({ ...req.body, otp });
    emailsend(req.body.email, otp);
    await otps.save();
    res.status(200).send(otps.email);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const userdelete = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id });

    if (!user) {
      res.status(404).send("user not found");
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};

const VerifyUser = async (req, res) => {
  const userid = req.params.id;

  const user = await User.findById(userid);

  if (!user) {
    throw new Error("use not found");
  }
  const updates = Object.keys(req.body);
  const allowedUpdates = ["_id", "verify", "isProfileUpdate"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (user[update] = req.body[update]));
    const token = await user.generateAuthToken();
    user.token = token;
    await user.save();
    VerifyUserWhen(user.email, user.name);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      type: user.type,
      mobileNo: user.mobileNo,
      isProfileUpdate: user.isProfileUpdate,
      token,
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const UpdatePassword = async (req, res) => {
  const user = await OtP.find({ otp: req.body.otp, email: req.body.email });
  if (user.length === 0) {
    res.status(400).send("No user, Sorry");
  } else {
    const userData = await User.findOne({ email: req.body.email });
    userData.password = req.body.password;
    await userData.save();
    res.status(200).send("success");
  }
};

module.exports = {
  Register,
  Login,
  VerifyUser,
  Alluser,
  ForgotPassword,
  UpdatePassword,
  userdelete,
};
