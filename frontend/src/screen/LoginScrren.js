import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { login } from "../Actions/userAction";
import validateL from "../Components/validateL";
import validator from "validator";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const theme = createTheme();

const SignInSide = () => {
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [news, setNew] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const [type, setType] = useState("");
  const [open, setOpen] = useState();

  const handleClick = () => {
    setOpen(true);
  };

  const handlechange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setNew("");
    if (name === "email") {
      if (!validator.isEmail(value)) {
        setMessage("Email address is invalid");
      } else {
        setMessage("");
      }
    } else if (name === "password") {
      if (value.length < 6) {
        setPassword("Password needs to be 6 characters or more");
      } else {
        setPassword("");
      }
    } else {
      setType(value);
      setNew("");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(`/login/${type}`);
    }
  }, [userInfo, navigate, type]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClick();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const values = { email, password, type };
    const mess = validateL(values);

    if (Object.keys(mess).length !== 0) {
      setNew(mess);
    } else {
      setNew("");
      dispatch(login(values));
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
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LoginIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
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
            {loading && <Loader />}
            <br />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Types of login
              </InputLabel>
              <Select
                onChange={handlechange}
                labelId="demo-simple-select-label"
                value={type}
                id="demo-simple-select"
                label="Types of login"
                error={!!news.type}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Alumni">Alumni</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handlechange}
                error={!!message || !!news.email}
                helperText={message}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handlechange}
                error={!!password || !!news.password}
                helperText={password}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/HomeScreen/ResetPassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/HomeScreen/Register" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <br />
    </ThemeProvider>
  );
};

export default SignInSide;
