import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SideNavigation from "../Components/sidenavigation";

const AdminScrren = () => {
  const styles = {
    contentDiv: {
      display: "flex",
      paddingTop: "57px",
    },

    contentMargin: {
      paddingTop: "10px",
      marginLeft: "20px",
      width: "100%",
      display: "flex",
    },
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login/Admin/Dashboard");
  }, []);

  return (
    <div style={styles.contentDiv}>
      <SideNavigation></SideNavigation>
      {/* <Grid container spacing={12}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex' }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>
                      This is a media card. You can use this section to describe the
                      content.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid> */}

      <div style={styles.contentMargin}>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AdminScrren;
