import React, { useState } from "react";
import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { deleteevent } from "../Actions/EventAction";
import Card from "@mui/material/Card";

import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
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

const Event = ({ eve }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(deleteevent(eve._id));
  };
  return (
    <div>
      <Card
        sx={{
          Width: 300,
          height: 350,
          boxShadow: "5px 5px 10px grey",
          transition: "all 0.5s ease",
          backgroundColor: "InactiveBorder",
          // display: "",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:5000/${eve.ImageLocation}`}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <b>{eve.Name}</b>
          </Typography>
          <div style={{ display: "flex", marginTop: "5px" }}>
            <EventIcon />
            <Typography variant="body2" sx={{ marginLeft: "10px" }}>
              {new Date(eve.Date).toLocaleString("en-us", {
                month: "long",
                year: "numeric",
                day: "numeric",
              })}
            </Typography>
          </div>
          <div style={{ display: "flex", marginTop: "5px" }}>
            <InfoIcon />
            <Typography variant="body2" sx={{ marginLeft: "10px" }}>
              {eve.Description}
            </Typography>
          </div>
        </CardContent>
      </Card>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure ?
            </Typography>
            <Typography>
              <br />
              <Button variant="contained" onClick={deleteHandler}>
                Yes
              </Button>{" "}
              <Button variant="contained" color="success" onClick={handleClose}>
                No
              </Button>
            </Typography>
          </Box>
        </Modal>
      </div>

      <br />
    </div>
  );
};

export default Event;
