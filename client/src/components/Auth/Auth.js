import {
  Avatar,
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
} from "@material-ui/core";
import useStyles from "./styles";
import axios from "axios";

import { GoogleOAuthProvider } from "@react-oauth/google";

import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./input";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import { BACKEND_URL } from "../../BACKEND_URL";
import { FRONTEND_URL } from "../../FRONTEND_URL";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import Icon from "./icon";
import { signin, signup } from "../../actions/auth";

const initialstate = {
  firstname: "",
  lastname: "",
  password: "",
  email: "",
  confirmPassword: "",
};
const Auth = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const History = useHistory();
  const [isSignUp, setSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialstate);
  const submitHandler = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, History));
    } else {
      dispatch(signin(formData, History));
    }
  };
  const handler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const SwitchMode = () => {
    setSignUp(!isSignUp);
    handleShowPassword(!showPassword);
  };
  const googleSuccess = async (res) => {
    axios.post(`${BACKEND_URL}/user/logingoogle`, res).then((response) => {
      console.log(response);

      if (!response.data) {
        window.location.replace(FRONTEND_URL + "/auth");
      } else {
        console.log("response se data bhej rahe h \t", response);
        localStorage.setItem("profile", JSON.stringify(response.data));
        window.location.replace(FRONTEND_URL + "/");
      }
    });
  };
  // try {
  //   dispatch({ type: "AUTH", data: { result, token } });
  //   History.push("/");
  // } catch (e) {}
  // //console.log(res);
  const googleFailure = (error) => {
    console.log("Google SigIn Failed :", error);
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {isSignUp == true ? "Sign Up" : "Sign In"}
          </Typography>
          <form
            autoComplete="off"
            className={classes.form}
            onSubmit={submitHandler}
          >
            <Grid container spacing={3}>
              {isSignUp && (
                <>
                  <Input
                    name="firstname"
                    label="First Name"
                    handleChange={handler}
                    autofocus={true}
                    half
                  />
                  <Input
                    name="lastname"
                    label="Last Name"
                    handleChange={handler}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email"
                handleChange={handler}
                type={"email"}
              />
              <Input
                name="password"
                label="Password"
                handleChange={handler}
                type={!showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  handleChange={handler}
                  // type={showPassword ? "text" : "password"}
                  // handleShowPassword={handleShowPassword}
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignUp ? "SignUp" : "SignIn"}
            </Button>
            <GoogleOAuthProvider clientId="211176754832-spn0ia0fhald2svui83l8nhbupp1as4d.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  var decoded = jwt_decode(credentialResponse.credential);
                  console.log(decoded);
                  googleSuccess(decoded);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                width={360}
                theme="filled_black"
                size="medium"
                shape="rectangular"
                logo_alignment="left"
              />
              ;
            </GoogleOAuthProvider>
            ;
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={SwitchMode}>
                  {isSignUp ? "Already Have an Account ?" : "Create Account"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default Auth;
