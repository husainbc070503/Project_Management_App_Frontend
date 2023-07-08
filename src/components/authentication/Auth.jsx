import { Container, Grid } from "@mui/material";
import React from "react";
import loginimg from "../../images/login-img.jpeg";
import AuthForm from "./AuthForm";

const Auth = () => {
  return (
    <Container maxWidth="lg">
      <div className="container">
        <Grid container spacing={10} alignItems="center">
          <Grid item md={6} xs={12}>
            <img src={loginimg} alt="image" className="front-img" />
          </Grid>
          <Grid item md={6} xs={12}>
            <AuthForm />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Auth;
