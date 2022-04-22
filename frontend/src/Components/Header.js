import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { useMedia } from "react-use";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { logout } from "../Actions/userAction";
import { profilesRead } from "../Actions/profileAction";
import SchoolIcon from "@mui/icons-material/School";
import Container from "@mui/material/Container";
import { BASE_URL } from "../constants/baseurl";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = () => {
  const isMobile = useMedia("(max-width: 720px)");
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const profileRead = useSelector((state) => state.profileRead);
  const { ProfileInfo } = profileRead;
  const classes = useStyles();
  const settings = ["Profile", "Logout"];
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const Home = () => {
    navigate("/HomeScreen/welcome");
  };
  const Login = () => {
    navigate("/HomeScreen/login");
  };

  const Register = () => {
    navigate("/HomeScreen/Register");
  };

  const dashboard = () => {
    navigate(`/login/${userInfo.type}/Dashboard`);
  };
  const dispatch = useDispatch();
  const settingHandler = (setting) => {
    if (setting === "Logout") {
      dispatch(logout());
      navigate(`/HomeScreen/login`);
    } else {
      navigate(`/login/${userInfo.type}/${setting}`);
    }
  };

  useEffect(() => {
    if (userInfo) {
      dispatch(profilesRead());
    }
  }, [userInfo, dispatch]);

  return (
    <AppBar position="fixed">
      <Container maxWidth="100%" sx={{ backgroundColor: "#236c7e" }}>
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            <Button
              color="inherit"
              onClick={Home}
              style={{ color: "#fff", fontSize: "20px" }}
            >
              <SchoolIcon
                sx={{ fontSize: "50px", marginRight: "15px", color: "#fff" }}
              />
              {!isMobile && <b>College Alumni Portal</b>}
            </Button>
          </Typography>
          {!userInfo ? (
            <>
              <Button color="inherit" onClick={Register}>
                Sign Up
              </Button>
              <Button color="inherit" onClick={Login}>
                Sign In
              </Button>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 0 }}>
                <Button color="inherit" onClick={dashboard}>
                  Dashboard
                </Button>

                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu}>
                    {ProfileInfo?.Image ? (
                      <Avatar src={`${BASE_URL}/${ProfileInfo?.Image}`} />
                    ) : (
                      <Avatar sx={{ bgcolor: "orange" }}>
                        {userInfo?.name.split(" ")[0].slice(0, 1)}{" "}
                      </Avatar>
                    )}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography onClick={() => settingHandler(setting)}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
