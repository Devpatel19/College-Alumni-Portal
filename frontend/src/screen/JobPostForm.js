import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import { Button } from "@mui/material";
import err from "../Screen-css/errors.module.css";

import React, { useEffect, useState } from "react";
import validateJob from "../Components/ValidateJob";

import { useDispatch, useSelector } from "react-redux";
import { jobPost } from "../Actions/JobAction";
import { useNavigate } from "react-router-dom";

const JobPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [job, setJob] = useState(false);
  useEffect(() => {
    if (!userInfo || userInfo.type !== "Alumni") {
      navigate("/login");
    }

    if (job) {
      navigate("/login/Alumni/mycreatejob");
    }
  }, [userInfo, job, navigate]);

  const [values, setValues] = useState({
    CompanyName: "",
    Role: "",
    Experience: "",
    City: "",
    RequireSkill: "",
    Salary: "",
    ExtraDetail: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const submitForm = (e) => {
    e.preventDefault();
    const mess = validateJob(values);
    if (Object.keys(mess).length !== 0) {
      setMessage("* field is required");
    } else {
      dispatch(jobPost(values));
      setJob(true);
      navigate("/login/Alumni/mycreatejob");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          // marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Job
        </Typography>
        <Box onSubmit={submitForm} component="form" noValidate sx={{ mt: 1 }}>
          {message && <p className={err.error}>{message}</p>}
          <FormControl fullWidth>
            <TextField
              required
              margin="normal"
              fullWidth
              id="CompanyName"
              label="Company Name"
              name="CompanyName"
              autoComplete="CompanyName"
              onChange={handleChange}
              autoFocus
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              fullWidth
              id="Role"
              label="Role"
              name="Role"
              autoComplete="Role"
              onChange={handleChange}
              autoFocus
              required
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Experience"
              label="Experience"
              name="Experience"
              type="Number"
              autoComplete="Experience"
              onChange={handleChange}
              autoFocus
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              required
              fullWidth
              id="City"
              label="City"
              name="City"
              autoComplete="City"
              onChange={handleChange}
              autoFocus
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Salary"
              label="Salary"
              name="Salary"
              type="number"
              autoComplete="Salary"
              onChange={handleChange}
              autoFocus
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              required
              fullWidth
              id="RequireSkill"
              label="RequireSkill"
              name="RequireSkill"
              autoComplete="RequireSkill"
              onChange={handleChange}
              autoFocus
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              required
              fullWidth
              id="ExtraDetail"
              label="ExtraDetail"
              name="ExtraDetail"
              autoComplete="ExtraDetail"
              onChange={handleChange}
              autoFocus
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default JobPostForm;
