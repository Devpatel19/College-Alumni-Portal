import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Register from "./screen/RegisterScreen";
import Login from "./screen/LoginScrren";
import Header from "./Components/Header";
import UserListScreen from "./screen/allUserscreen";
import Allstudent from "./screen/allStudent";
import Allalumni from "./screen/allAlumni";
import HomeScreen from "./screen/HomeScreen";
import AdminScrren from "./screen/adminScrren";
import StudentScreen from "./screen/studentScreen";
import AlumniScreen from "./screen/alumniScreen";
import JobPostForm from "./screen/JobPostForm";
import JobListScreen from "./screen/Alljob";
import EventScreen from "./screen/eventScreen";
import EventListScreen from "./screen/Allevent";
import JobReadScreen from "./screen/readJob";
import "./App.css";
import Dashboard from "./screen/Dashboard";
import ProfileScreen from "./screen/ProfileScreen";
import DetailScreen from "./screen/detailScreen";
import MyApplyJob from "./screen/myapplyjob";
import Batchmates from "./screen/batchmateScreen";
import ForgotPassword from "./screen/Forgotpasswordscreen";
import ChangePassword from "./screen/changepassword";
import DashboardAlumni from "./screen/DashboardAlumni";
import DashboardStudent from "./screen/DashboardStudent";
import HomePage from "./Components/welcomepage";
import EventManage from "./screen/ManageEvent";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <main className="main">
          <Routes>
            <Route
              path="/"
              element={<Navigate replace to="/HomeScreen" />}
              exact
            />
            <Route path="/HomeScreen" element={<HomeScreen />}>
              <Route path="welcome" element={<HomePage />} />
              <Route path="Register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="ResetPassword" element={<ForgotPassword />} />
              <Route path="changepassword" element={<ChangePassword />} />
            </Route>

            <Route path="/login/Admin" element={<AdminScrren />}>
              <Route path="alluser" element={<UserListScreen />} />
              <Route path="alljobs" element={<JobListScreen />} />
              <Route path="allevents" element={<EventListScreen />} />
              <Route path="createEvent" element={<EventScreen />} />
              <Route path="profile" element={<ProfileScreen />} />
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="allstudent" element={<Allstudent />} />
              <Route path="allalumni" element={<Allalumni />} />
              <Route path="manageevent" element={<EventManage />} />
            </Route>

            <Route path="/login/Student" element={<StudentScreen />}>
              <Route path="Dashboard" element={<DashboardStudent />} />
              <Route path="alljobs" element={<JobListScreen />} />
              <Route path="allevents" element={<EventListScreen />} />
              <Route path="profile" element={<ProfileScreen />} />
              <Route path="myApplyjob" element={<MyApplyJob />} />
              <Route path="batchmate" element={<Batchmates />} />
            </Route>
            <Route path="/login/Alumni" element={<AlumniScreen />}>
              <Route path="Dashboard" element={<DashboardAlumni />} />
              <Route path="createjob" element={<JobPostForm />} />
              <Route path="mycreatejob" element={<JobReadScreen />} />
              <Route path="alljobs" element={<JobListScreen />} />
              <Route path="allevents" element={<EventListScreen />} />
              <Route path="Details" element={<DetailScreen />} />
              <Route path="profile" element={<ProfileScreen />} />
              <Route path="batchmate" element={<Batchmates />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
