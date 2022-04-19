import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import classes from "./index.module.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SchoolIcon from "@mui/icons-material/School";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
export default function Footer() {
  return (
    <footer style={{ width: "100%", bottom: 0, height: "100px" }}>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 3, sm: 7 }}
        bgcolor="#236c7e"
        color="white"
        fontSize="18px"
      >
        {/* <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <Box borderBottom={1}>Account</Box>
              <br />
              <Box>
                <Link
                  to="/HomeScreen/login"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Login
                </Link>
              </Box>
              <Box>
                <Link
                  to="/HomeScreen/Register"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Register
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box
            textAlign="center"
            color="white"
            pt={{ xs: 5, sm: 10 }}
            pb={{ xs: 5, sm: 0 }}
          >
            College Alumni Portal &reg; {new Date().getFullYear()}
          </Box>
        </Container> */}
        <div className={classes["how-it-works"]}>
          <div className={classes.contianer}>
            <h2>How it Works</h2>
            <div className={classes.flex}>
              <div>
                <Link
                  to="/HomeScreen/login"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <AdminPanelSettingsIcon />
                  <h4>Admin</h4>
                  <p>Admin Can Manage Event and User</p>
                </Link>
              </div>
              <div>
                <Link
                  to="/HomeScreen/login"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <SchoolIcon />
                  <h4>Alumni</h4>
                  <p>Alumni Can Create and Manage Job</p>
                </Link>
              </div>
              <div>
                <Link
                  to="/HomeScreen/login"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <PersonOutlineIcon />
                  <h4>Student</h4>
                  <p>Student Can Apply Job and View Batchmates</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Box textAlign="center" color="white" fontSize="20px">
          College Alumni Portal &reg; {new Date().getFullYear()}
        </Box>
      </Box>
    </footer>
  );
}
