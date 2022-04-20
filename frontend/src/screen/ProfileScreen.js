import React, { useState, useEffect } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardHeader,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Col,
  Row,
} from "reactstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { UploadImage } from "../Actions/uploadAction";
import {
  profilesPost,
  profilesRead,
  Updateprofile,
} from "../Actions/profileAction";
import { Aprroval } from "../Actions/userAction";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { Navigate, useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const updateProfile = useSelector((state) => state.updateProfile);
  const { ProfileInfoupdate } = updateProfile;

  const profilePost = useSelector((state) => state.profilePost);
  const { profileInfo } = profilePost;

  const uploadImage = useSelector((state) => state.uploadImage);
  const { images } = uploadImage;

  const profileRead = useSelector((state) => state.profileRead);
  const { ProfileInfo } = profileRead;
  useEffect(() => {
    if (ProfileInfoupdate) {
      dispatch(profilesRead(userInfo._id));
    }
    if (profileInfo) {
      dispatch(profilesRead(userInfo._id));
      const val = dispatch(
        Aprroval({ _id: userInfo._id, isProfileUpdate: true })
      );
      // navigate(`/login/${userInfo.type}/profile`);
    }
    if (userInfo.isProfileUpdate) {
      dispatch(profilesRead(userInfo._id));
    }
  }, [userInfo, profileInfo, ProfileInfoupdate, dispatch]);
  const [value, setValue] = React.useState(
    ProfileInfo?.Passingyear
      ? new Date(`${ProfileInfo?.Passingyear}`)
      : new Date()
  );

  const [editvalues, setEditValues] = useState({
    Name: userInfo.name,
    Email: userInfo.email,
    Type: userInfo.type,
    MobileNo: userInfo.mobileNo,
    Image: profileInfo?.Image,
    Education: profileInfo?.Education,
    Passingyear: profileInfo?.Passingyear,
    CompanyName: profileInfo?.CompanyName,
  });
  const EdithandleChange = (e) => {
    const { name, value } = e.target;
    setEditValues({
      ...editvalues,
      [name]: value,
    });
  };

  const uploadFileHandler = (e) => {
    const value = e.target.files[0];
    dispatch(UploadImage(value));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    editvalues["Image"] = images;
    if (value !== null) {
      editvalues["Passingyear"] = value.getFullYear();
    }

    ProfileInfo
      ? dispatch(Updateprofile(editvalues))
      : dispatch(profilesPost(editvalues));
  };

  return (
    <div style={{ width: "100%" }}>
      <br />
      <Card className="w-100" style={{ border: "1px solid" }}>
        <CardHeader>
          <CardTitle tag="h5">Edit Profile</CardTitle>
        </CardHeader>
        <CardBody>
          <Form onSubmit={submitHandler}>
            <Row>
              <Col className="pr-1" md="2">
                {ProfileInfo?.Image && (
                  <Avatar
                    variant="square"
                    style={{
                      width: "250px",
                      height: "250px",
                      borderRadius: "5px",

                      backgroundSize: "cover",
                    }}
                    src={`http://localhost:5000/${ProfileInfo?.Image}`}
                  />
                )}
              </Col>
            </Row>
            <Row>
              <FormGroup>
                <Label for="exampleFile">Image :</Label>
                <br />
                <Input
                  id="exampleFile"
                  name="file"
                  type="file"
                  onChange={uploadFileHandler}
                />
              </FormGroup>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label>Name</label>
                  <Input
                    defaultValue={userInfo.name}
                    placeholder="Username"
                    type="text"
                    name="Name"
                    onChange={EdithandleChange}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <Input
                    disabled
                    defaultValue={userInfo.email}
                    name="Email"
                    placeholder="Email"
                    type="email"
                    onChange={EdithandleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label>Education</label>
                  <Input
                    name="Education"
                    defaultValue={ProfileInfo?.Education}
                    placeholder="Education"
                    type="text"
                    onChange={EdithandleChange}
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <label>Mobile No.</label>
                  <Input
                    name="MobileNo"
                    defaultValue={userInfo.mobileNo}
                    placeholder="Mobile No."
                    type="text"
                    onChange={EdithandleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <label>Passingyear</label>
                  {/* {profileInfo && (
                    <Input
                      name="Passingyear"
                      value={ProfileInfo?.Passingyear}
                      placeholder="Passing Year"
                      type="text"
                      disabled
                    />
                  )} */}
                  <br />

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DatePicker
                        views={["year"]}
                        label="-"
                        value={value}
                        onChange={(newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField {...params} helperText={null} />
                        )}
                      />
                    </Stack>
                  </LocalizationProvider>
                </FormGroup>
              </Col>
              <Col md="6">
                {userInfo.type === "Alumni" && (
                  <FormGroup>
                    <label>Company Name</label>
                    <Input
                      name="CompanyName"
                      defaultValue={profileInfo?.CompanyName}
                      placeholder="Company Name"
                      type="text"
                      onChange={EdithandleChange}
                    />
                  </FormGroup>
                )}
              </Col>
            </Row>
            <Row>
              <div className="update ml-auto mr-auto">
                {ProfileInfo ? (
                  <Button className="btn-round" color="primary" type="submit">
                    Update Profile
                  </Button>
                ) : (
                  <Button className="btn-round" color="primary" type="submit">
                    Complete
                  </Button>
                )}
              </div>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfileScreen;
