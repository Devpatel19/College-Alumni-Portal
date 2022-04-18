import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaGem } from "react-icons/fa";
import { Menu, MenuItem, ProSidebar, SidebarHeader } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Actions/userAction";
import { useNavigate } from "react-router-dom";
import EventNoteIcon from "@mui/icons-material/EventNote";
import WorkIcon from "@mui/icons-material/Work";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SchoolIcon from "@mui/icons-material/School";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const SideNavigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const styles = {
    sideBarHeight: {
      minHeight: "100vh",
      fixed: "left",
    },
    menuIcon: {
      float: "right",
      margin: "10px",
    },
  };
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/HomeScreen/login");
  };
  return (
    <div style={{ minHeight: "94.5vh", height: "auto" }}>
      <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
        <SidebarHeader>
          <b>
            <p
              style={{
                float: "left",
                paddingLeft: "10px",
                paddingTop: "20px",
                fontSize: "15px",
              }}
            >
              {userInfo.type}
            </p>
          </b>
          <div style={styles.menuIcon} onClick={onClickMenuIcon}>
            <AiOutlineMenu />
          </div>
        </SidebarHeader>
        <Menu iconShape="square">
          {userInfo && userInfo.isAdmin && (
            <MenuItem icon={<PeopleOutlineIcon />}>
              <NavLink to="alluser">Users</NavLink>
            </MenuItem>
          )}
          <MenuItem icon={<EventNoteIcon />}>
            <NavLink to="allevents">Events</NavLink>
          </MenuItem>
          {userInfo.isAdmin && (
            <MenuItem icon={<PersonOutlineIcon />}>
              <NavLink to="allstudent">Student</NavLink>
            </MenuItem>
          )}
          {userInfo.isAdmin && (
            <MenuItem icon={<SchoolIcon />}>
              <NavLink to="allalumni">Alumni</NavLink>
            </MenuItem>
          )}
          {userInfo.type !== "Admin" && (
            <MenuItem icon={<WorkIcon />}>
              <NavLink to="alljobs">Jobs</NavLink>
            </MenuItem>
          )}
          <MenuItem icon={<AccountCircleIcon />}>
            <NavLink to="profile">Profile</NavLink>
          </MenuItem>
          {userInfo && userInfo.isAdmin && (
            <MenuItem icon={<AddCircleOutlineIcon />}>
              <NavLink to="createEvent">Create Events</NavLink>
            </MenuItem>
          )}
          {userInfo.type === "Alumni" ? (
            <MenuItem icon={<AddCircleOutlineIcon />}>
              <NavLink to="createjob">Create Job</NavLink>
            </MenuItem>
          ) : (
            ""
          )}
          {userInfo.type === "Alumni" ? (
            <MenuItem icon={<FaGem />}>
              <NavLink to="mycreatejob">My Created Job</NavLink>
            </MenuItem>
          ) : (
            ""
          )}
          {userInfo.type === "Student" ? (
            <MenuItem icon={<FaGem />}>
              <NavLink to="myApplyjob">My Apply Job</NavLink>
            </MenuItem>
          ) : (
            ""
          )}
          {userInfo.type === "Admin" && (
            <MenuItem icon={<GroupIcon />}>
              <NavLink to="manageevent">Manage Event</NavLink>
            </MenuItem>
          )}
          {userInfo.type !== "Admin" ? (
            <MenuItem icon={<GroupIcon />}>
              <NavLink to="batchmate">Batchmates</NavLink>
            </MenuItem>
          ) : (
            ""
          )}
          <MenuItem icon={<LogoutIcon />} onClick={logoutHandler}>
            logout
          </MenuItem>
        </Menu>
      </ProSidebar>
    </div>
  );
};
export default SideNavigation;
