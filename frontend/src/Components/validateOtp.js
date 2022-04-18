export default function validateOtp(values) {
  let errors = {};
  if (!values.otp) {
    errors.otp = "Otp required";
  } else if (values.otp.length === 0) {
    errors.otp = "Otp is invalid";
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
