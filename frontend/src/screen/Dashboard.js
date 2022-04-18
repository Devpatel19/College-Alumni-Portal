import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import PersonIcon from "@mui/icons-material/Person";
import {
  Chart,
  PieSeries,
  Legend,
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
import SchoolIcon from "@mui/icons-material/School";

const Dashboard = () => {
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

  return (
    <Box sx={{ flexGrow: 1, paddingTop: "20px" }}>
      {loading && <Loader />}
      {DetailDashboard && (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Link
              to={"/login/Admin/allstudent"}
              style={{ textDecoration: "inherit" }}
            >
              <Card sx={{ backgroundColor: "lightgreen" }}>
                <CardContent center>
                  <PersonIcon />
                  <Typography gutterBottom variant="h5" component="div">
                    Student
                  </Typography>
                  <Typography variant="h3" color="darkcyan">
                    {DetailDashboard?.TotalStudent}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Link
              to={"/login/Admin/allalumni"}
              style={{ textDecoration: "inherit" }}
            >
              <Card sx={{ backgroundColor: "lightgray" }}>
                <CardContent>
                  <SchoolIcon />
                  <Typography gutterBottom variant="h5" component="div">
                    Alumni
                  </Typography>
                  <Typography variant="h3" color="darkgray">
                    {DetailDashboard?.TotalAlumni}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Link
              to={"/login/Admin/alluser"}
              style={{ textDecoration: "inherit" }}
            >
              <Card sx={{ backgroundColor: "lightskyblue" }}>
                <CardContent>
                  <SupervisorAccountIcon />
                  <Typography gutterBottom variant="h5" component="div">
                    Total
                  </Typography>
                  <Typography variant="h3" color="darkblue">
                    {DetailDashboard?.TotalUser}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card>
              <h1>Area of User</h1>

              <Chart
                data={[
                  { User: "Total User", Count: DetailDashboard.TotalUser },
                  { User: "Student", Count: DetailDashboard.TotalStudent },
                  { User: "Alumni", Count: DetailDashboard.TotalAlumni },
                ]}
              >
                <PieSeries valueField="Count" argumentField="User" />
                <Animation />
                <Legend />
              </Chart>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Card>
              <Chart
                data={[
                  { year: "<20000", population: 2 },
                  { year: "20000 - 25000", population: 4 },
                  { year: "25000 - 30000", population: 7 },
                  { year: ">30000", population: 10 },
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
          <Grid item xs={12} sm={5}>
            <Link
              to={"/login/Admin/alljobs"}
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
          <Grid item xs={12} sm={5}>
            <Link
              to={"/login/Admin/allevents"}
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
          <Grid item xs={12} sm={4}>
            <></>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
