import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";

const handleChange = () => {};

const SettingScreen = () => {
  return (
    <Card sx={{ width: "75%", height: "40%" }}>
      <CardHeader title="Update password" />
      <Divider />
      <CardContent>
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          name="password"
          onChange={handleChange}
          type="password"
          // value={values.password}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Confirm password"
          margin="normal"
          name="confirm"
          onChange={handleChange}
          type="password"
          // value={values.confirm}
          variant="outlined"
        />
      </CardContent>
      <Divider />
      <Button color="primary" variant="contained">
        Update
      </Button>
    </Card>
  );
};

export default SettingScreen;
