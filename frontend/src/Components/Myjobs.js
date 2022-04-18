import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { Form, FormGroup, Input, Label } from "reactstrap";

import { MdDelete, MdEdit, MdOutlineGridView } from "react-icons/md";
import { deletejob, updateJob } from "../Actions/JobAction";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { readdetail } from "../Actions/DetailAction";
import { useNavigate } from "react-router-dom";

const MyJob = ({ job }) => {
  const [modal, setModal] = useState(false);
  const [deleted, setDelete] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewData = () => {
    const id = job._id;
    dispatch(readdetail(id));
    navigate("/login/Alumni/Details");
  };

  const deletes = () => setDelete(!deleted);
  const toggle = () => setModal(!modal);

  const [values, setValues] = useState({
    CompanyName: job.CompanyName,
    Role: job.Role,
    Experience: job.Experience,
    City: job.City,
    RequireSkill: job.RequireSkill,
    Salary: job.Salary,
    ExtraDetail: job.ExtraDetail,
    _id: job._id,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const deleteHandler = (e) => {
    const id = job._id;
    dispatch(deletejob(id));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateJob(values));
    toggle();
  };

  return (
    <div style={{ alignContent: "center" }}>
      <Card className="w-100">
        <CardImg
          alt="Card image cap"
          src="http://localhost:5000/uploads/imgs/job.jpg"
        />
        <CardBody>
          <CardTitle tag="h5">Role:- {job.Role}</CardTitle>
          <CardText>Company Name :- {job.CompanyName}</CardText>
          <CardText>Experience :- {job.Experience}</CardText>
          <CardText>Salary :- {job.Salary}</CardText>
          <CardText>RequireSkill :- {job.RequireSkill}</CardText>
          <CardText>City :- {job.City}</CardText>
          <CardText>ExtraDetail :- {job.ExtraDetail}</CardText>
          <Button color="danger" value={job._id} onClick={deletes}>
            <MdDelete />
          </Button>{" "}
          {}
          {}
          <Button color="info" onClick={toggle}>
            <MdEdit />
          </Button>{" "}
          {}
          {}
          <Button color="info" value={job._id} onClick={viewData}>
            <MdOutlineGridView />
          </Button>
        </CardBody>
      </Card>
      <div>
        <Modal
          centered
          fullscreen="lg"
          size="lg"
          isOpen={modal}
          toggle={toggle}
        >
          <ModalHeader>Edit Job</ModalHeader>
          <ModalBody>
            <Form onSubmit={submitHandler}>
              <FormGroup>
                <Label>Company Name:-</Label>
                <Input
                  type="text"
                  defaultValue={job.CompanyName}
                  name="CompanyName"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Role:-</Label>
                <Input
                  type="text"
                  defaultValue={job.Role}
                  name="Role"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Experience:-</Label>
                <Input
                  type="number"
                  defaultValue={job.Experience}
                  name="Experience"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>City:-</Label>
                <Input
                  type="text"
                  defaultValue={job.City}
                  name="City"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>RequireSkill:-</Label>
                <Input
                  type="text"
                  defaultValue={job.RequireSkill}
                  name="RequireSkill"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Salary:- </Label>
                <Input
                  type="number"
                  defaultValue={job.Salary}
                  name="Salary"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>Extra Details :-</Label>
                <Input
                  name="ExtraDetail"
                  defaultValue={job.ExtraDetail}
                  type="textarea"
                  onChange={handleChange}
                />
              </FormGroup>
              <br />
              <Button color="info" value={job._id}>
                Edit
              </Button>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
      <div>
        <Modal
          centered
          fullscreen="sm"
          size="sm"
          isOpen={deleted}
          toggle={deletes}
        >
          <ModalBody>
            <p>Are you sure???</p>
          </ModalBody>
          <ModalFooter>
            <Button color="info" onClick={deletes}>
              No
            </Button>
            {}
            <Button color="danger" onClick={deleteHandler}>
              Yes
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};
export default MyJob;
