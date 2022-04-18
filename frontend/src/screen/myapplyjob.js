import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReadJobApply } from "../Actions/DetailAction";
import MaterialTable from "material-table";
import tableIcons from "./tableaction";
const MyApplyJob = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const DetailApply = useSelector((state) => state.DetailApply);
  const { MyApplyJob } = DetailApply;

  useEffect(() => {
    if (userInfo) {
      dispatch(ReadJobApply());
    }
  }, [userInfo, dispatch]);
  const data = [];
  MyApplyJob?.map((myjob) => {
    data.push({
      CompanyName: myjob.Job.CompanyName,
      Role: myjob.Job.Role,
      Salary: myjob.Job.Salary,
      Experience: myjob.Job.Experience,
      City: myjob.Job.City,
    });
  });

  const columns = [
    { title: "CompanyName", field: "CompanyName" },
    { title: "Role", field: "Role" },
    { title: "Salary", field: "Salary", type: "numeric" },
    { title: "Experience", field: "Experience" },
    { title: "City", field: "City" },
  ];
  return (
    <MaterialTable
      style={{ width: "100%" }}
      icons={tableIcons}
      title="My Apply Job"
      columns={columns}
      data={data}
      options={{
        actionsColumnIndex: -1,
        rowStyle: { backgroundColor: "#EEE" },
        headerStyle: {
          backgroundColor: "#13504A",
          color: "#FFF",
        },
      }}
    />
  );
};

export default MyApplyJob;
