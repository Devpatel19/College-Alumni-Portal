import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { DetailsPost } from "../Actions/DetailAction";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label,
  Form,
} from "reactstrap";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const Job = ({ job }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [values, setValues] = useState({
    Name: userInfo.name,
    Email: userInfo.email,
    MobileNo: userInfo.mobileNo,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const applyHandler = (e) => {
    e.preventDefault();
    const Id = job._id;
    values["Job"] = Id;
    values["owner"] = userInfo._id;
    dispatch(DetailsPost(values));
    toggle();
    navigate("/login/Student/myApplyjob");
  };
  return (
    <div>
      <Card
        onClick={toggle}
        sx={{
          width: 300,
          height: 400,
          marginLeft: "30px",
          borderRadius: "20px",
          boxShadow: "5px 5px 10px grey",
          transition: "all 0.5s ease",
          backgroundColor: "lightgray",
          "&:hover": {
            transform: "scale(1.05)",
            backgroundColor: "black",
            color: "white",
          },
        }}
      >
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={toggle}
          sx={{
            padding: 0,
            height: "55px",
            fontSize: "25px",
            textTransform: "capitalize",
          }}
        >
          {`Apply Now`.toLowerCase()}
        </Button>
        <CardActionArea>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
              <b>{job.Role.toUpperCase()}</b>
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "19px" }}>
              {job.CompanyName}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "19px" }}>
              Experience: {job.Experience}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "19px" }}>
              RequireSkill: {job.RequireSkill}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "19px" }}>
              Salary: {job.Salary}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "19px" }}>
              Location: {job.City}
            </Typography>
            <CardActions></CardActions>
          </CardContent>
        </CardActionArea>
      </Card>
      <div>
        <Modal
          centered
          fullscreen="sm"
          size="sm"
          isOpen={modal}
          toggle={toggle}
        >
          <ModalBody>
            <Form onSubmit={applyHandler}>
              <FormGroup>
                <Label>Name:-</Label>
                <Input
                  type="text"
                  defaultValue={userInfo.name}
                  name="Name"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Email:-</Label>
                <Input
                  type="email"
                  defaultValue={userInfo.email}
                  name="Email"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Mobile No:-</Label>
                <Input
                  type="number"
                  defaultValue={userInfo.mobileNo}
                  name="MobileNo"
                  onChange={handleChange}
                />
              </FormGroup>
              <br />
              <Button type="submit">Confirm</Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={toggle}>
              cancel
            </Button>
            {}
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default Job;
