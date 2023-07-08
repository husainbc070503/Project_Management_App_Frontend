import { Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import frontimg from "../images/front-img.jpeg";
import { useGlobalUserContext } from "../contexts/UserContext";
import Projects from "./projects/Projects";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user } = useGlobalUserContext();
  const navigate = useNavigate();

  return (
    <div className="container">
      {!user?.user ? (
        <Container maxWidth="lg">
          <header className="header">
            <Grid container spacing={2} alignItems="center">
              <Grid item md={6} xs={12}>
                <Typography className="Typography title">
                  Free Online Project Management Tool
                </Typography>
                <Typography className="Typography text">
                  Organize and Manage your projects as well as your Team
                  Projects at one instance for free.
                </Typography>
                <Button variant="contained" onClick={() => navigate("../auth")}>
                  Get Started
                </Button>
              </Grid>
              <Grid item md={6} xs={12}>
                <img src={frontimg} alt="frontimg" className="front-img" />
              </Grid>
            </Grid>
          </header>
        </Container>
      ) : (
        <Projects />
      )}
    </div>
  );
};

export default Index;
