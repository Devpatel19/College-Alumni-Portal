import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import err from "../Screen-css/errors.module.css";
import { readallevents } from "../Actions/EventAction";

import "../../node_modules/font-awesome/css/font-awesome.min.css";
import Event from "../Components/Event";
const EventListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const EventList = useSelector((state) => state.EventList);
  const { loading, error, events } = EventList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const UpdateEvent = useSelector((state) => state.UpdateEvent);
  const { event } = UpdateEvent;

  const DeleteEvent = useSelector((state) => state.DeleteEvent);
  const { eventd } = DeleteEvent;

  useEffect(() => {
    if (userInfo || event || eventd) {
      dispatch(readallevents());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo, event, eventd]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <p className={err.error}>{error}</p>
      ) : (
        <Grid container spacing={2}>
          {events?.map((eve) => (
            <Grid key={eve._id} item xs="auto">
              <br />
              <Event eve={eve} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default EventListScreen;
