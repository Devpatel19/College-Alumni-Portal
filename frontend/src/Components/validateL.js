import validator from "validator";

export default function validateL(values) {
  let errors = {};
  if (!values.type) {
    errors.type = "Type required";
  }
  if (!values.email) {
    errors.email = "Email required";
  } else if (!validator.isEmail(values.email)) {
    errors.email = "Email address is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be 6 characters or more";
  }
  return errors;
}
