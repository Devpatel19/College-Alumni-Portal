import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideNavigation from "../Components/sidenavigation";
const StudentScreen = () => {
  const styles = {
    contentDiv: {
      display: "flex",
      paddingTop: "57px",
    },
    contentMargin: {
      marginLeft: "8px",
      width: "100%",
      padding: "10px",
    },
  };
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login/Student/Dashboard");
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

export default StudentScreen;
