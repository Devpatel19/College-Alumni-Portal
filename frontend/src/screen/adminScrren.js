import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SideNavigation from "../Components/sidenavigation";

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

  useEffect(() => {
    navigate("/login/Admin/Dashboard");
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
