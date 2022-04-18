const express = require("express");
const { auth, admin } = require("../Middleware/authMiddleware");
const {
  Register,
  Login,
  VerifyUser,
  Alluser,
  ForgotPassword,
  UpdatePassword,
  userdelete,
} = require("../controllers/userController");
const router = express.Router();

router.post("/users", Register);

router.post("/users/login", Login);

router.post("/users/forgotpassword", ForgotPassword);

router.patch("/user/verify/:id", auth, VerifyUser);

router.delete("/user/delete/:id", auth, admin, userdelete);

router.patch("/user/passwordchange", UpdatePassword);

router.get("/users", auth, Alluser);

module.exports = router;
