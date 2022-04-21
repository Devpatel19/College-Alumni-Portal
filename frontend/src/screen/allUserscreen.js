import MaterialTable from "@material-table/core";
import tableIcons from "./tableaction";
import { readalluser, Aprroval, deleteuser } from "../Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

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

const BasicTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [datas, setData] = useState("");
  const [open, setOpen] = useState(false);
  const [deletes, setDelete] = useState(false);

  const userUpdate = useSelector((state) => state.userApproval);
  const { success } = userUpdate;

  const DeleteUser = useSelector((state) => state.DeleteUser);
  const { userd } = DeleteUser;

  const aprrovalHandler = (Id) => {
    setOpen(false);
    dispatch(Aprroval({ _id: Id, verify: true }));
  };

  const deleteHandler = (Id) => {
    setDelete(false);
    dispatch(deleteuser(Id));
  };

  const handleOpen = (rowData) => {
    setOpen(true);
    setData(rowData.id);
  };
  const handleClose = () => setOpen(false);
  const handleDeleteopen = (rowData) => {
    setDelete(true);
    setData(rowData.id);
  };
  const handleDeleteclose = () => setDelete(false);

  useEffect(() => {
    if (success || userd) {
      navigate("/login/Admin/alluser");
    }
    if (userInfo && userInfo.isAdmin) {
      dispatch(readalluser());
    } else {
      navigate("/login");
    }
  }, [dispatch, userInfo, success, userd, navigate]);

  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const data = [];

  users?.map((user) =>
    data.push({
      name: user.name,
      email: user.email,
      mobileNo: user.mobileNo,
      type: user.type,
      verify: user.verify,
      id: user._id,
    })
  );

  const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Mobile No", field: "mobileNo", type: "numeric" },
    { title: "Type", field: "type" },
    { title: "Verify", field: "verify" },
  ];

  return (
    <>
      {" "}
      <MaterialTable
        style={{ width: "100%" }}
        icons={tableIcons}
        title="User Table"
        columns={columns}
        data={data}
        options={{
          actionsColumnIndex: -1,
          rowStyle: { backgroundColor: "#EEE" },
          headerStyle: {
            backgroundColor: "rgb(25 118 210)",
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
            icon:
              rowData.verify === false ? tableIcons.Edit : tableIcons.Button,
            tooltip:
              rowData.verify === false ? "Verify User" : "Already verified",
            disabled: rowData.verify,
            onClick: (event, rowData) => handleOpen(rowData),
          }),
        ]}
      />
      <div>
        <Modal
          open={open}
          onClose={handleClose}
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
                onClick={() => aprrovalHandler(datas)}
              >
                Yes
              </Button>{" "}
              <Button variant="contained" color="success" onClick={handleClose}>
                No
              </Button>
            </Typography>
          </Box>
        </Modal>
      </div>
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
              <Button variant="contained" onClick={() => deleteHandler(datas)}>
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
      <br />
    </>
  );
};

export default BasicTable;
