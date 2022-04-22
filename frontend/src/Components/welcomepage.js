import { Link } from "react-router-dom";
import classes from "../Screen-css/background.module.css";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";

const HomePage = () => {
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="xs">
        <div className={classes.wrapper}>
          <div className={classes.center}>
            <Slide in={true} timeout={2000} direction="down">
              <div>
                <h3>Welcome To </h3>
                <h2>College Alumni Portal</h2>
              </div>
            </Slide>
            <Slide in={true} timeout={2000} direction="up">
              <div className={classes.buttons}>
                <Link to="/HomeScreen/Register">
                  <button className={classes.btn2}>Register Now</button>
                </Link>
              </div>
            </Slide>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
