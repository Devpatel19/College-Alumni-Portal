import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
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
import { readalljobs } from "../Actions/JobAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const JobList = useSelector((state) => state.JobList);
  const { jobs } = JobList;

  useEffect(() => {
    if (userInfo.type === "Admin") {
      dispatch(readalljobs());
      dispatch(dashboardDetail());
    } else {
      console.log("gdsad");
      navigate("/HomeScreen/login");
    }
  }, [userInfo, dispatch, navigate]);

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

  // console.log(t20, t25, t30, t35);
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
                <CardContent>
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
