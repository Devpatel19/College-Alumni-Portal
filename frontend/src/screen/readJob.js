import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import { deletejob, readJob, updateJob } from "../Actions/JobAction";
import MaterialTable from "material-table";
import tableIcons from "./tableaction";
import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { readdetail } from "../Actions/DetailAction";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FormControl } from "@mui/material";

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

  const [open, setOpen] = useState(false);

  const [datas, setData] = useState({});
  const [deletes, setDelete] = useState(false);

  const ReadJob = useSelector((state) => state.ReadJob);
  const { jobs } = ReadJob;

  const DeleteJob = useSelector((state) => state.DeleteJob);
  const { successd } = DeleteJob;

  const UpdateJob = useSelector((state) => state.UpdateJob);
  const { success } = UpdateJob;

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (success || successd) {
      dispatch(readJob());
    }
  }, [success, successd, dispatch]);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [values, setValues] = useState({
    CompanyName: "",
    Role: "",
    Experience: "",
    City: "",
    RequireSkill: "",
    Salary: "",
  });

  const handleClickOpen = (rowData) => {
    setOpen(true);
    setData(rowData);
    setValues({
      CompanyName: rowData.CompanyName,
      Role: rowData.Role,
      Experience: rowData.Experience,
      City: rowData.City,
      RequireSkill: rowData.RequireSkill,
      Salary: rowData.Salary,
      _id: rowData._id,
    });
  };

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
      CompanyName: job.CompanyName,
      Role: job.Role,
      City: job.City,
      RequireSkill: job.RequireSkill,
      Salary: job.Salary,
      _id: job._id,
      Experience: job.Experience,
    });
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(values);
    dispatch(updateJob(values));
    handleClose();
  };

  const columns = [
    { title: "Company Name", field: "CompanyName" },
    { title: "Role", field: "Role" },
    { title: "City", field: "City" },
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
            onClick: (event, rowData) => viewData(rowData._id),
          }),
          (rowData) => ({
            icon: tableIcons.Edit,
            tooltip: "Edit Job",
            onClick: (event, rowData) => handleClickOpen(rowData),
          }),
        ]}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Job</DialogTitle>
        <DialogContent>
          <Box onSubmit={submitForm} component="form" noValidate sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <TextField
                required
                margin="normal"
                fullWidth
                id="CompanyName"
                label="Company Name"
                name="CompanyName"
                autoComplete="CompanyName"
                defaultValue={datas.CompanyName}
                onChange={handleChange}
                autoFocus
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                margin="normal"
                fullWidth
                id="Role"
                label="Role"
                name="Role"
                autoComplete="Role"
                defaultValue={datas.Role}
                onChange={handleChange}
                autoFocus
                required
              />
            </FormControl>

            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Experience"
                label="Experience"
                name="Experience"
                type="Number"
                autoComplete="Experience"
                defaultValue={datas.Experience}
                onChange={handleChange}
                autoFocus
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                fullWidth
                id="City"
                label="City"
                name="City"
                autoComplete="City"
                onChange={handleChange}
                defaultValue={datas.City}
                autoFocus
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                fullWidth
                id="Salary"
                label="Salary"
                name="Salary"
                type="number"
                autoComplete="Salary"
                defaultValue={datas.Salary}
                onChange={handleChange}
                autoFocus
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                fullWidth
                id="RequireSkill"
                label="RequireSkill"
                name="RequireSkill"
                autoComplete="RequireSkill"
                defaultValue={datas.RequireSkill}
                onChange={handleChange}
                autoFocus
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
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
                onClick={() => deleteHandler(datas._id)}
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
