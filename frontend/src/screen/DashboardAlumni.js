import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
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
import EventNoteIcon from "@mui/icons-material/EventNote";
import WorkIcon from "@mui/icons-material/Work";
import { readalljobs } from "../Actions/JobAction";

const DashboardAlumni = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const JobList = useSelector((state) => state.JobList);
  const { jobs } = JobList;

  useEffect(() => {
    if (userInfo.type === "Alumni") {
      dispatch(readalljobs());
      dispatch(dashboardDetail());
    }
  }, [userInfo, dispatch]);

  const DashboardDetail = useSelector((state) => state.DashboardDetail);
  const { loading, DetailDashboard } = DashboardDetail;

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
              to={"/login/Alumni/allevents"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Card sx={{ backgroundColor: "lightgoldenrodyellow" }}>
                <CardContent>
                  <EventNoteIcon />
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
              to={"/login/Alumni/alljobs"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Card sx={{ backgroundColor: "lightpink" }}>
                <CardContent>
                  <WorkIcon />
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
          <Grid item xs={12} sm={6}>
            <Link
              to={"/login/Alumni/createjob"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Card sx={{ backgroundColor: "lightgreen" }}>
                <CardContent>
                  <AddIcon />
                  <Typography gutterBottom variant="h5" component="div">
                    Add Job
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={2}></Grid>
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
    </Box>
  );
};

export default DashboardAlumni;
