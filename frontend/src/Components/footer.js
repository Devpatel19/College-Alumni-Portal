import Box from "@material-ui/core/Box";

import classes from "../Screen-css/index.module.css";
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
        <div className={classes["how-it-works"]}>
          <div className={classes.contianer}>
            <h2>How it Works</h2>
            <div className={classes.flex}>
              <div>
                <AdminPanelSettingsIcon />
                <h4>Admin</h4>
                <p>Admin Can Manage Event and User</p>
              </div>
              <div>
                <SchoolIcon />
                <h4>Alumni</h4>
                <p>Alumni Can Create and Manage Job</p>
              </div>
              <div>
                <PersonOutlineIcon />
                <h4>Student</h4>
                <p>Student Can Apply Job and View Batchmates</p>
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
