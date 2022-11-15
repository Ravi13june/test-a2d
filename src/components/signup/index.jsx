import { useState } from "react";
import { Formik, Form } from "formik";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  MenuItem,
  Select,
  FormHelperText,
} from "@mui/material";
import A2D from "../assets/a2glogo.png";
import { signUpSchema } from "../../validationSchema";

const SignUpForm = ({ handleSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ mb: "2rem" }}>
        <img src={A2D} alt="logo" />
      </Box>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          name: "",
          phone: "",
          email: "",
          password: "",
          country: "",
        }}
        validationSchema={signUpSchema}
      >
        {({ handleSubmit, handleChange, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <Box onSubmit={handleSubmit} sx={{ maxWidth: "430px" }}>
              <OutlinedInput
                fullWidth
                name="name"
                onChange={handleChange}
                placeholder="Full Name"
                autoComplete="fullName"
                autoFocus
                sx={{ marginBottom: "5px", fontWeight: 600, fontSize: "14px" }}
              />
              {errors.name && touched.name && (
                <FormHelperText sx={{ color: "red", marginBottom: "10px" }}>
                  {errors.name}
                </FormHelperText>
              )}
              <OutlinedInput
                fullWidth
                onChange={handleChange}
                placeholder="Phone Number"
                name="phone"
                autoComplete="phoneNumber"
                sx={{ marginBottom: "5px", fontWeight: 600, fontSize: "14px" }}
              />
              {errors.phone && touched.phone && (
                <FormHelperText sx={{ color: "red", marginBottom: "10px" }}>
                  {errors.phone}
                </FormHelperText>
              )}
              <Select
                sx={{ marginBottom: "5px", fontWeight: 600, fontSize: "14px" }}
                fullWidth
                onChange={handleChange}
                name="country"
                displayEmpty
                placeholder="Country"
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="india">India</MenuItem>
                <MenuItem value="srilanka">SriLanka</MenuItem>
                <MenuItem value="afghanistan">Afghanistan</MenuItem>
              </Select>
              {errors.country && touched.country && (
                <FormHelperText sx={{ color: "red", marginBottom: "10px" }}>
                  {errors.country}
                </FormHelperText>
              )}
              <OutlinedInput
                onChange={handleChange}
                fullWidth
                name="email"
                placeholder="Email"
                autoComplete="email"
                autoFocus
                sx={{ marginBottom: "5px", fontWeight: 600, fontSize: "14px" }}
              />
              {errors.email && touched.email && (
                <FormHelperText sx={{ color: "red", marginBottom: "10px" }}>
                  {errors.email}
                </FormHelperText>
              )}
              <OutlinedInput
                onChange={handleChange}
                fullWidth
                placeholder="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                sx={{ marginBottom: "5px", fontWeight: 600, fontSize: "14px" }}
              />
              {errors.password && touched.password && (
                <FormHelperText sx={{ color: "red", marginBottom: "10px" }}>
                  {errors.password}
                </FormHelperText>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  padding: "15px",
                  borderRadius: "15px",
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "16px",
                }}
              >
                Signup
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignUpForm;
