import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import { readalljobs, readalljobsPage } from "../Actions/JobAction";
import Job from "../Components/Job";
import { Grid, Pagination, Box } from "@mui/material";
import { ReadJobApply } from "../Actions/DetailAction";
const JobListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);

  const JobPage = useSelector((state) => state.JobPage);
  const { loading, jobpage } = JobPage;

  const JobList = useSelector((state) => state.JobList);
  const { jobs } = JobList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const DetailApply = useSelector((state) => state.DetailApply);
  const { MyApplyJob } = DetailApply;

  useEffect(() => {
    if (userInfo) {
      dispatch(ReadJobApply(userInfo._id));
      dispatch(readalljobsPage(skip));
      dispatch(readalljobs());
    } else {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const data = [];
  MyApplyJob?.map((myjob) => {
    data.push(myjob.Job._id);
  });

  // const datas = jobpage?.filter((job) => !data.includes(job._id));

  const handletry = (event, page) => {
    //console.log(value);
    setPage(page);
    dispatch(readalljobsPage(4 * (page - 1)));

    setSkip(4 * (page - 1));
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Grid container spacing={2}>
            {jobpage?.map((job) => (
              <Grid item sm="auto" key={job._id}>
                <br />
                <Job job={job} />
              </Grid>
            ))}
          </Grid>
          <br />
          <br />

          <Pagination
            count={jobs?.length / 4}
            page={page}
            variant="outlined"
            color="primary"
            onChange={handletry}
          />
        </>
      )}
    </div>
  );
};

export default JobListScreen;
