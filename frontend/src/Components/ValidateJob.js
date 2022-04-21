const validateJob = (values) => {
  let errors = {};
  if (!values.CompanyName) {
    errors.CompanyName = "CompanyName is required";
  }

  if (!values.Experience) {
    errors.experience = "Experience is required";
  }

  if (!values.City) {
    errors.City = "City is required";
  }
  if (!values.RequireSkill) {
    errors.RequireSkill = "RequireSkill is required";
  }
  if (!values.Role) {
    errors.Role = "Role is required";
  }
  if (!values.Salary) {
    errors.Salary = "Salary is required";
  }
  return errors;
};
export default validateJob;
