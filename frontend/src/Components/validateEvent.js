const validateEvent = (values) => {
  let errors = {};
  if (!values.ImageLocation) {
    errors.ImageLocation = "ImageLocation is required";
  }

  if (!values.Description) {
    errors.Description = "Description is required";
  }

  if (!values.Date) {
    errors.Date = "Date is required";
  }
  if (!values.Name) {
    errors.Name = "Name is required";
  }
  return errors;
};
export default validateEvent;
