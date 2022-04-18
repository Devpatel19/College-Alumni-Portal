import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { readalljobs } from "../Actions/JobAction";
import Job from "../Components/Job";
import { Grid } from "@mui/material";

const JobListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const JobList = useSelector((state) => state.JobList);
  const { loading, jobs } = JobList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(readalljobs());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <div style={{ paddingTop: "20px" }}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid container spacing={2}>
            {jobs.map((job) => (
              <Grid xs={12} sm={3}>
                <br />
                <Job job={job} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default JobListScreen;
