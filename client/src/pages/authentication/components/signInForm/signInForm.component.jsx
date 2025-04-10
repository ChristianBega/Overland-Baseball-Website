import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// Components
import AlternativeAuthCta from "../alternativeAuthCta/alternativeAuthCta";
// MUI
import { Button, Stack, TextField, Typography, Link as MuiLink, Grid } from "@mui/material";
// React Hook Form
import { Controller, useForm } from "react-hook-form";
// Config
import signInInputFields from "./signInInputFields.config.json";
// Utils & Hooks
import { signInAuthWithEmailAndPassword } from "../../../../setup/utils/firebase/authentication";
import { StyledForm } from "../../../../styles/index.styles";
import InputFieldComponent from "../../../../components/inputFields/inputFields";

const SignInForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleSignUpForm = async (data) => {
    const { email, password } = data;
    try {
      await signInAuthWithEmailAndPassword(email, password);
      reset();
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect Password!");
          break;
        case "auth/user-not-found":
          alert("Sorry, no user found!");
          break;
        case "auth/invalid-login-credentials":
          alert("Please recheck your email/password!");
          break;
        default:
          alert(error);
      }
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleSignUpForm)} id="sign-in-form" aria-label="Sign In Form">
      <Grid container direction="column" spacing={2} mb={4}>
        {signInInputFields.map((config, index) => (
          <Grid key={index + config.name} item xs={12}>
            <Controller
              required
              name={config.name}
              control={control}
              rules={config.rules}
              render={({ field }) => (
                <InputFieldComponent
                  id={config.name}
                  placeHolder={config.placeholder}
                  type={config.type}
                  label={config.label}
                  fullWidth
                  value={field.value}
                  onChange={field.onChange}
                  error={errors[config.name]}
                  // variant="outlined"
                  helperText={errors.player_name?.message}
                  {...field}
                />
              )}
            />
          </Grid>
        ))}
      </Grid>
      <MuiLink variant="highlighted" component={RouterLink} to={"/authentication/password-reset"} aria-label="Forgot Password Link">
        Forgot your password?
      </MuiLink>
      <Button id="sign-in-form" type="submit" variant="contained" color="secondary" aria-label="Sign In Button" sx={{ mt: 2 }}>
        Sign In
      </Button>
      <AlternativeAuthCta />

      <Typography component="span" variant="span" textAlign="center">
        Don't have an account?{" "}
        <MuiLink variant="highlighted" component={RouterLink} to={"/authentication/sign-up"} aria-label="Create Account Link">
          Register Now
        </MuiLink>
      </Typography>
    </StyledForm>
  );
};

export default SignInForm;
// {
//   "name": "password",
//   "label": "Blazer Number",
//   "placeholder": "Enter blazer number here...",
//   "type": "password",
//   "rules": {
//     "required": "Blazer Number is required *",
//     "pattern": {
//       "value": "^(?=.*\\d).{8,}$",
//       "message": "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (@#$%^&+=!)"
//     }
//   }
// },
