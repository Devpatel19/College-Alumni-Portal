import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MaterialTable from "material-table";
import tableIcons from "./tableaction";
import { useDispatch } from "react-redux";
import { readallevents } from "../Actions/EventAction";
import { Input } from "reactstrap";
import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { deleteevent } from "../Actions/EventAction";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Stack from "@mui/material/Stack";
import { UploadImage } from "../Actions/uploadAction";
import { updateEvent } from "../Actions/EventAction";

const style = {
  position: "absolute",
  top: "40%",
  left: "40%",

  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EventManage = () => {
  const dispatch = useDispatch();

  const DeleteEvent = useSelector((state) => state.DeleteEvent);
  const { eventd } = DeleteEvent;

  useEffect(() => {
    dispatch(readallevents());
  }, [eventd]);
  const EventList = useSelector((state) => state.EventList);
  const { loading, error, events } = EventList;
  const [datas, setData] = useState({});
  const [deletes, setDelete] = useState(false);

  const data = [];
  const [name, setName] = useState("");
  const [value, setValue] = useState(new Date());
  const [description, setDescription] = useState("");

  const uploadImage = useSelector((state) => state.uploadImage);
  const { images } = uploadImage;

  events?.map((event) => {
    data.push({
      name: event.Name,
      id: event._id,
      description: event.Description,
      date: new Date(event.Date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    });
  });

  const [open, setOpen] = React.useState(false);

  const uploadFileHandler = (e) => {
    const values = e.target.files[0];
    dispatch(UploadImage(values));
  };

  const handleClickOpen = (rowData) => {
    setOpen(true);
    setData(rowData);
    setValue(rowData.date);
    setDescription(rowData.description);
    setName(rowData.name);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteopen = (rowData) => {
    setDelete(true);
    setData(rowData);
  };
  const handleDeleteclose = () => setDelete(false);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Date", field: "date" },
  ];

  const deleteHandler = (Id) => {
    setDelete(false);
    dispatch(deleteevent(Id));
  };

  const edithandler = () => {
    const editvalue = {
      Name: name,
      Description: description,
      Date: value,
      _id: datas.id,
    };
    editvalue["ImageLocation"] = images;
    console.log(editvalue);
    dispatch(updateEvent(editvalue));
    handleClose();
  };
  return (
    <>
      <MaterialTable
        style={{ width: "100%" }}
        icons={tableIcons}
        title="Manage Event"
        columns={columns}
        data={data}
        options={{
          actionsColumnIndex: -1,
          rowStyle: { backgroundColor: "#EEE" },
          headerStyle: {
            backgroundColor: "#13504A",
            color: "#FFF",
          },
        }}
        actions={[
          {
            icon: tableIcons.Delete,
            tooltip: "Delete User",
            onClick: (event, rowData) => handleDeleteopen(rowData),
          },
          {
            icon: tableIcons.Edit,
            tooltip: "Edit Event",
            onClick: (event, rowData) => handleClickOpen(rowData),
          },
        ]}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Event Name"
              name="name"
              autoComplete="name"
              autoFocus
              defaultValue={datas.name}
              onChange={(e) => {
                setName(e.target.value);
              }}
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
              defaultValue={datas.description}
              autoFocus
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={edithandler}
          >
            Edit
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <div>
        <Modal
          open={deletes}
          onClose={handleDeleteclose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure ?
            </Typography>
            <Typography>
              <br />
              <Button
                variant="contained"
                onClick={() => deleteHandler(datas.id)}
              >
                Yes
              </Button>{" "}
              <Button
                variant="contained"
                color="success"
                onClick={handleDeleteclose}
              >
                No
              </Button>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default EventManage;
