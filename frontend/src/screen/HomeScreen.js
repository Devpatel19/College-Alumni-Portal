import React, { Fragment, useEffect } from "react";

import { Outlet } from "react-router-dom";

import Footer from "../Components/footer";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/HomeScreen/welcome");
  }, []);

  return (
    <Fragment>
      <div
        style={{
          background: "linear-gradient(180deg, aliceblue, #add6ff)",
          paddingTop: "60px",
        }}
      >
        <Outlet />
        <Footer />
      </div>
    </Fragment>
  );
};

export default Header;
