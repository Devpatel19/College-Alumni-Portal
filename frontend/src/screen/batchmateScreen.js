import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import Loader from "../Components/Loader";
import { allprofilesRead, profilesRead } from "../Actions/profileAction";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Avatar } from "@mui/material";

const Batchmates = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const AllProfile = useSelector((state) => state.AllProfile);
  const { loading, AllProfiles } = AllProfile;

  const profileRead = useSelector((state) => state.profileRead);
  const { ProfileInfo } = profileRead;

  useEffect(() => {
    if (userInfo) {
      dispatch(profilesRead());
      dispatch(allprofilesRead());
    }
  }, [userInfo, dispatch]);

  const dsgad = AllProfiles?.filter(
    (profile) =>
      profile.Type === userInfo.type &&
      profile.Passingyear === ProfileInfo?.Passingyear &&
      profile.Email !== userInfo.email
  );

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Grid className="sample-grid" container spacing={1}>
          {dsgad.map((profile) => (
            <Grid item xs={12} sm={4} key={profile._id}>
              <Card
                sx={{
                  backgroundColor: "lightsalmon",

                  borderRadius: "20px",
                  margin: "15px",
                  padding: "15px",
                  boxShadow: "5px 5px 10px grey",
                  transition: "all 0.5s ease",
                  display: "flex",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <Avatar
                  src={`http://localhost:5000/${profile.Image}`}
                  sx={{ width: 150, height: 150, alignSelf: "center" }}
                ></Avatar>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <b>{profile.Name.toUpperCase()}</b>
                  </Typography>
                  <Typography variant="body2">{profile.Email}</Typography>
                  <Typography variant="body2">{profile.MobileNo}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Batchmates;
