import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { allprofilesRead, profilesRead } from "../Actions/profileAction";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
import { useSelector, useDispatch } from "react-redux";
import { dashboardDetail } from "../Actions/Dashboardaction";
import Loader from "../Components/Loader";
import { readalljobs } from "../Actions/JobAction";

const DashboardStudent = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(dashboardDetail());
    }
  }, [userInfo, dispatch]);

  const DashboardDetail = useSelector((state) => state.DashboardDetail);
  const { loading, DetailDashboard } = DashboardDetail;

  const profileRead = useSelector((state) => state.profileRead);
  const { ProfileInfo } = profileRead;

  const AllProfile = useSelector((state) => state.AllProfile);
  const { AllProfiles } = AllProfile;

  const JobList = useSelector((state) => state.JobList);
  const { jobs } = JobList;

  useEffect(() => {
    if (userInfo) {
      dispatch(readalljobs());
      dispatch(allprofilesRead());
      dispatch(profilesRead(userInfo._id));
    }
  }, [userInfo, dispatch]);

  const dsgad = AllProfiles?.filter(
    (profile) =>
      profile.Type === userInfo.type &&
      profile.Passingyear === ProfileInfo?.Passingyear &&
      profile.Email !== userInfo.email
  ).length;

  const t20 = jobs?.filter((job) => job.Salary <= 20000).length;
  const t25 = jobs?.filter(
    (job) => job.Salary <= 25000 && job.Salary > 20000
  ).length;

  const t30 = jobs?.filter(
    (job) => job.Salary > 25000 && job.Salary <= 30000
  ).length;

  const t35 = jobs?.filter((job) => job.Salary > 30000).length;

  return (
    <Box sx={{ flexGrow: 1, paddingTop: "20px" }}>
      {loading && <Loader />}
      {DetailDashboard && (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={5}>
            <Link
              to={"/login/Student/allevents"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Card sx={{ backgroundColor: "lightgoldenrodyellow" }}>
                <CardContent>
                  <SupervisorAccountIcon />
                  <Typography gutterBottom variant="h5" component="div">
                    Event
                  </Typography>
                  <Typography variant="h5" color="darkblue">
                    {DetailDashboard?.TotalEvent}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Link
              to={"/login/Student/alljobs"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Card sx={{ backgroundColor: "lightpink" }}>
                <CardContent>
                  <SupervisorAccountIcon />
                  <Typography gutterBottom variant="h5" component="div">
                    Job
                  </Typography>
                  <Typography variant="h5" color="darkblue">
                    {DetailDashboard?.TotalJob}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={5}>
            <Link
              to={"/login/Student/batchmate"}
              style={{ textDecoration: "inherit" }}
            >
              <Card sx={{ backgroundColor: "lightskyblue", minHeight: "100" }}>
                <CardContent>
                  <SupervisorAccountIcon />
                  <Typography gutterBottom variant="h5" component="div">
                    Batchmates
                  </Typography>
                  <Typography variant="h3" color="darkblue">
                    {dsgad}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Card>
              <Chart
                data={[
                  { year: "<20000", population: t20 },
                  { year: "20000 - 25000", population: t25 },
                  { year: "25000 - 30000", population: t30 },
                  { year: ">30000", population: t35 },
                ]}
              >
                <ArgumentAxis />
                <ValueAxis max={7} />

                <BarSeries valueField="population" argumentField="year" />
                <Title text="Job Detail" />
                <Animation />
              </Chart>
            </Card>
          </Grid>
        </Grid>
      )}
      <br />
    </Box>
  );
};

export default DashboardStudent;
