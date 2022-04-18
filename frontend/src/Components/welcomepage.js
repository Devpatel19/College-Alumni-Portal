import { Link } from "react-router-dom";
import classes from "../Screen-css/background.module.css";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

const HomePage = () => {
  return (
    <div>
      <CssBaseline />
      <Container maxWidth="xs">
        <div className={classes.wrapper}>
          <div className={classes.center}>
            <h3>Welcome To </h3>
            <h2>College Alumni Portal</h2>
            <div className={classes.buttons}>
              <Link to="/HomeScreen/Register">
                <button className={classes.btn2}>Register Now</button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
