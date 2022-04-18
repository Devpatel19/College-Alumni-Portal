import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import { Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { eventPost } from "../Actions/EventAction";
import { UploadImage } from "../Actions/uploadAction";
import { useNavigate } from "react-router-dom";
import validateEvent from "../Components/validateEvent";
import err from "../Screen-css/errors.module.css";

const EventScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(null);
  const [event, setEvent] = useState(false);
  const [message, setMessage] = useState("");

  const uploadImage = useSelector((state) => state.uploadImage);
  const { images } = uploadImage;

  useEffect(() => {
    if (event) {
      navigate("/login/Admin/allevents");
    }
  }, [event, navigate]);

  const uploadFileHandler = (e) => {
    const values = e.target.files[0];
    dispatch(UploadImage(values));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const values = {
      ImageLocation: images,
      Description: description,
      Date: value,
      Name: name,
    };
    const mess = validateEvent(values);
    if (Object.keys(mess).length !== 0) {
      setMessage("* field is required");
    } else {
      dispatch(eventPost(values));
      setEvent(true);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AddIcon />
        </Avatar>
        <br />
        <Typography component="h1" variant="h5">
          Add Event
        </Typography>
        <Box
          onSubmit={submitHandler}
          component="form"
          noValidate
          sx={{ mt: 1 }}
        >
          {message && <p className={err.error}>{message}</p>}
          <FormControl fullWidth>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Event Name"
              name="name"
              autoComplete="name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              autoFocus
            />
          </FormControl>
          <FormControl fullWidth>
            <br />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DatePicker
                  required
                  label="Event Date"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} />
                  )}
                />
              </Stack>
            </LocalizationProvider>
          </FormControl>

          <FormControl fullWidth>
            <br />
            <Input
              id="exampleFile"
              name="file"
              type="file"
              onChange={uploadFileHandler}
              required
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
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

export default EventScreen;
