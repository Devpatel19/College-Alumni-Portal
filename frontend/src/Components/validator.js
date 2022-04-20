import validator from "validator";

export default function validateInfo(values) {
  let errors = {};

  if (!values.name) {
    errors.name = "Username required";
  }

  if (!values.type) {
    errors.type = "Type required";
  }

  if (!values.email) {
    errors.email = "Email required";
  } else if (!validator.isEmail(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.mobileNo) {
    errors.mobileNo = "mobileNo is required";
  } else if (!validator.isMobilePhone(values.mobileNo, ["en-IN"])) {
    errors.mobileNo = "mobileNo is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  }

  if (!values.cpassword) {
    errors.cpassword = "Confirm Password is required";
  } else if (values.cpassword !== values.password) {
    errors.cpassword = "Passwords do not match";
  }
  return errors;
}
