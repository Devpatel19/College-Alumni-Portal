import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import { signup } from "../Actions/userAction";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import validator from "validator";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import validateInfo from "../Components/validator";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const theme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const [validate, setvalidate] = useState({
    Name: "",
    email: "",
    password: "",
    confirmpassword: "",
    mobileNo: "",
  });
  const [open, setOpen] = useState();

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/HomeScreen/login");
    }
  }, [userInfo, navigate]);

  const [validpassword, setvalidpassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClick();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const name = data.get("Name");
    const mobileNo = data.get("mobileNo");
    const cpassword = data.get("confirmpassword");

    const values = { email, password, name, mobileNo, type, cpassword };
    const mess = validateInfo(values);
    if (Object.keys(mess).length !== 0) {
      setMessage(mess);
    } else {
      dispatch(signup(values));
    }
  };
  const handlechange = (e) => {
    setMessage("");
    const name = e.target.name;
    const value = e.target.value;
    let error;
    if (name === "Name") {
      if (!value) {
        error = "Required";
      } else {
        error = "";
      }
      setvalidate({ Name: error });
    } else if (name === "email") {
      if (!validator.isEmail(value)) {
        error = "Email address is invalid";
      } else {
        error = "";
      }
      setvalidate({ email: error });
    } else if (name === "password") {
      if (value.length < 6) {
        error = "Password needs to be 6 characters or more";
      } else {
        error = "";
      }
      setvalidate({ password: error });
      setvalidpassword(value);
    } else if (name === "confirmpassword") {
      if (value !== validpassword) {
        error = "Passwords do not match";
      } else {
        error = "";
      }
      setvalidate({ confirmpassword: error });
    } else if (name === "mobileNo") {
      if (!validator.isMobilePhone(value, ["en-IN"])) {
        error = "mobileNo is invalid";
      } else {
        error = "";
      }
      setvalidate({ mobileNo: error });
    } else {
      console.log(name, value);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {error && (
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              sx={{ width: 400 }}
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {error}
              </Alert>
            </Snackbar>
          )}
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {loading && <Loader />}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Name"
                  onChange={handlechange}
                  error={!!validate.Name || !!message.name}
                  helperText={validate.Name}
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handlechange}
                  error={!!validate.email || !!message.email}
                  helperText={validate.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlechange}
                  error={!!validate.password || !!message.password}
                  helperText={validate.password}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmpassword"
                  autoComplete="new-password"
                  onChange={handlechange}
                  error={!!validate.confirmpassword || !!message.cpassword}
                  helperText={validate.confirmpassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobileNo"
                  label="Mobile No."
                  name="mobileNo"
                  type="number"
                  autoComplete="mobileNo"
                  onChange={handlechange}
                  error={!!validate.mobileNo || !!message.mobileNo}
                  helperText={validate.mobileNo}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Types of User
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Types of User"
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    error={!!message.type}
                    // helperText={message}
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Alumni">Alumni</MenuItem>
                    <MenuItem value="Student">Student</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/HomeScreen/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <br />
    </ThemeProvider>
  );
}
