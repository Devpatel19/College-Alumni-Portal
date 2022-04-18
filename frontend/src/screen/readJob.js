import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import { deletejob, readJob } from "../Actions/JobAction";
import MaterialTable from "material-table";
import tableIcons from "./tableaction";
import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { readdetail } from "../Actions/DetailAction";

const style = {
  position: "absolute",
  top: "40%",
  left: "40%",

  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const JobReadScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [datas, setData] = useState({});
  const [deletes, setDelete] = useState(false);

  const ReadJob = useSelector((state) => state.ReadJob);
  const { jobs } = ReadJob;

  const DeleteJob = useSelector((state) => state.DeleteJob);
  const { successd } = DeleteJob;

  const UpdateJob = useSelector((state) => state.UpdateJob);
  const { success } = UpdateJob;
  useEffect(() => {
    if (success || successd) {
      dispatch(readJob());
    }
  }, [success, successd, dispatch]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleDeleteopen = (rowData) => {
    setDelete(true);
    setData(rowData);
  };

  const viewData = (Id) => {
    dispatch(readdetail(Id));
    navigate("/login/Alumni/Details");
  };

  const handleDeleteclose = () => setDelete(false);

  const deleteHandler = (Id) => {
    setDelete(false);
    dispatch(deletejob(Id));
  };

  useEffect(() => {
    if (success) {
      navigate("/login/Alumni/mycreatejob");
    }
    if (userInfo) {
      dispatch(readJob());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, success, navigate]);

  const data = [];
  jobs?.map((job) => {
    data.push({
      name: job.CompanyName,
      Role: job.Role,
      city: job.City,
      RequireSkill: job.RequireSkill,
      Salary: job.Salary,
      id: job._id,
    });
  });

  const columns = [
    { title: "Name", field: "name" },
    { title: "Role", field: "Role" },
    { title: "City", field: "city" },
    { title: "RequireSkill", field: "RequireSkill" },
    { title: "Salary", field: "Salary" },
  ];

  return (
    <>
      <MaterialTable
        style={{ width: "100%" }}
        icons={tableIcons}
        title="My create Job"
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
        actions={[
          {
            icon: tableIcons.Delete,
            tooltip: "Delete User",
            onClick: (event, rowData) => handleDeleteopen(rowData),
          },
          (rowData) => ({
            icon: tableIcons.DetailPanel,
            tooltip: "View Detail",
            onClick: (event, rowData) => viewData(rowData.id),
          }),
        ]}
      />
      <div>
        <Modal
          open={deletes}
          onClose={handleDeleteclose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure ?
            </Typography>
            <Typography>
              <br />
              <Button
                variant="contained"
                onClick={() => deleteHandler(datas.id)}
              >
                Yes
              </Button>{" "}
              <Button
                variant="contained"
                color="success"
                onClick={handleDeleteclose}
              >
                No
              </Button>
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default JobReadScreen;
