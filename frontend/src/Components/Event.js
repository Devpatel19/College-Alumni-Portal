import React, { useState } from "react";
import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { deleteevent } from "../Actions/EventAction";
import Card from "@mui/material/Card";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import { BASE_URL } from "../constants/baseurl";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { NavLink } from "react-router-dom";
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

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Event = ({ eve }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(deleteevent(eve._id));
  };
  return (
    <div>
      <Card
        sx={{
          maxWidth: 400,
          // maxHeight: 410,
          minheight: 300,
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
          image={`${BASE_URL}/${eve.ImageLocation}`}
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
            <Typography
              align="justify"
              variant="body2"
              sx={{ marginLeft: "10px" }}
            >
              {!expanded
                ? eve.Description.slice(0, 100).concat(".....")
                : eve.Description}
            </Typography>
          </div>
        </CardContent>
        <NavLink to="">
          <p
            style={{ paddingLeft: "300px", color: "blue" }}
            onClick={handleExpandClick}
          >
            {!expanded ? "Read more" : "Read less"}
          </p>
        </NavLink>

        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {!expanded ? "Read more" : "Read less"}
        </ExpandMore> */}

        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <div style={{ display: "flex", marginTop: "5px" }}>
              <InfoIcon />
              <Typography variant="body2" sx={{ marginLeft: "10px" }}>
                {eve.Description}
              </Typography>
            </div>
          </CardContent>
        </Collapse> */}
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
