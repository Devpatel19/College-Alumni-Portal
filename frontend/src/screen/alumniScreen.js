import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SideNavigation from "../Components/sidenavigation";
const AlumniScreen = () => {
  const styles = {
    contentDiv: {
      display: "flex",
      paddingTop: "57px",
    },
    contentMargin: {
      marginLeft: "10px",
      width: "100%",
      display: "flex",
      padding: "10px",
    },
  };
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login/Alumni/Dashboard");
  }, []);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);
  return (
    <div style={styles.contentDiv}>
      <SideNavigation />
      <div style={styles.contentMargin}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AlumniScreen;
