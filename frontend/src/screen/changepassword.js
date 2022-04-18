import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";

import err from "../Screen-css/errors.module.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockResetIcon from "@mui/icons-material/LockReset";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { changePasswords } from "../Actions/userAction";
import validateOtp from "../Components/validateOtp";
const theme = createTheme();

const ChangePassword = () => {
  const [message, setMessage] = useState({});
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ResetPassword = useSelector((state) => state.ResetPassword);
  const { error, emailInfo } = ResetPassword;

  const ChangePassword = useSelector((state) => state.ChangePassword);
  const { changePassword } = ChangePassword;
  useEffect(() => {
    if (changePassword) {
      navigate("/HomeScreen/login");
    }
  }, [changePassword, navigate]);

  const otpChange = (otps) => {
    setOtp(otps);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const password = data.get("password");
    const cpassword = data.get("confirmpassword");
    const values = { otp, password, cpassword };

    const mess = validateOtp(values);

    if (Object.keys(mess).length !== 0) {
      setMessage(mess);
    } else {
      const news = { otp, password, email: emailInfo };
      dispatch(changePasswords(news));
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "500px",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockResetIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <br />
              <br />
              {error && <p className={err.error}>{error}</p>}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Typography>Enter Otp:-</Typography>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <OtpInput
                    value={otp}
                    onChange={otpChange}
                    numInputs={4}
                    separator={<span>-</span>}
                    inputStyle={{
                      width: "3rem",
                      height: "3rem",
                      margin: "0 1rem",
                      fontSize: "2rem",
                      borderRadius: 4,
                      border: "1px solid rgba(0,0,0,0.3)",
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                  {message && <p className={err.error}>{message.password}</p>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmpassword"
                    autoComplete="new-password"
                  />
                </FormControl>
                {message && <p className={err.error}>{message.cpassword}</p>}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ChangePassword;
