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
} from "@devexpress/dx-react-chart-material-ui";

import { Animation } from "@devexpress/dx-react-chart";
import { useSelector, useDispatch } from "react-redux";
import { dashboardDetail } from "../Actions/Dashboardaction";
import Loader from "../Components/Loader";
import SchoolIcon from "@mui/icons-material/School";
import { readalljobs } from "../Actions/JobAction";
import AddIcon from "@mui/icons-material/Add";
import ReactApexChart from "react-apexcharts";
import { allprofilesRead } from "../Actions/profileAction";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const AllProfile = useSelector((state) => state.AllProfile);
  const { AllProfiles } = AllProfile;

  useEffect(() => {
    if (userInfo.type === "Admin") {
      dispatch(readalljobs());
      dispatch(dashboardDetail());
      dispatch(allprofilesRead());
    } else {
      navigate("/HomeScreen/login");
    }
  }, [userInfo, dispatch, navigate]);

  const DashboardDetail = useSelector((state) => state.DashboardDetail);
  const { loading, DetailDashboard } = DashboardDetail;
  const ps2018 = AllProfiles?.filter(
    (profile) => profile.Passingyear === 2018 && profile.Type === "Student"
  ).length;
  const ps2019 = AllProfiles?.filter(
    (profile) => profile.Passingyear === 2019 && profile.Type === "Student"
  ).length;

  const ps2020 = AllProfiles?.filter(
    (profile) => profile.Passingyear === 2020 && profile.Type === "Student"
  ).length;

  const ps2021 = AllProfiles?.filter(
    (profile) => profile.Passingyear === 2021 && profile.Type === "Student"
  ).length;

  const ps2022 = AllProfiles?.filter(
    (profile) => profile.Passingyear === 2022 && profile.Type === "Student"
  ).length;

  const ps2023 = AllProfiles?.filter(
    (profile) => profile.Passingyear === 2023 && profile.Type === "Student"
  ).length;

  const pa2018 = AllProfiles?.filter(
    (profile) => profile.Passingyear === 2018 && profile.Type === "Alumni"
  ).length;
  const pa2019 = AllProfiles?.filter(
    (profile) => profile.Passingyear === 2019 && profile.Type === "Alumni"
  ).length;

  const pa2020 = AllProfiles?.filter(
    (profile) => profile.Passingyear === 2020 && profile.Type === "Alumni"
  ).length;

  const pa2021 = AllProfiles?.filter(
    (profile) => profile.Passingyear === 2021 && profile.Type === "Alumni"
  ).length;

  const pa2022 = AllProfiles?.filter(
    (profile) => profile.Passingyear === 2022 && profile.Type === "Alumni"
  ).length;

  const pa2023 = AllProfiles?.filter(
    (profile) => profile.Passingyear === 2023 && profile.Type === "Alumni"
  ).length;

  const option = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "year",
      categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
    },
  };

  const serie = [
    {
      name: "Students",
      data: [ps2018, ps2019, ps2020, ps2021, ps2022, ps2023],
    },
    {
      name: "Alumni",
      data: [pa2018, pa2019, pa2020, pa2021, pa2022, pa2023],
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, paddingTop: "20px" }}>
      {loading && <Loader />}
      {DetailDashboard && (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={8}>
            <Link
              to={"/login/Admin/createEvent"}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Card sx={{ backgroundColor: "lightpink" }}>
                <CardContent>
                  <AddIcon />
                  <Typography gutterBottom variant="h5" component="div">
                    Add Event
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}></Grid>
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
            <ReactApexChart
              options={option}
              series={serie}
              type="area"
              height={350}
            />
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
