import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SideNavigation from "../Components/sidenavigation";
import { useSelector } from "react-redux";

const AdminScrren = () => {
  const styles = {
    contentDiv: {
      display: "flex",
      paddingTop: "57px",
    },

    contentMargin: {
      marginLeft: "20px",
      width: "100%",
      display: "flex",
      padding: "24px",
    },
  };
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      navigate("/login/Admin/Dashboard");
    } else {
      navigate("/HomeScreen/login");
    }
  }, []);

  return (
    <div style={styles.contentDiv}>
      <SideNavigation></SideNavigation>
      <div style={styles.contentMargin}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AdminScrren;
