import { Button, Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import "./Projects.css";
import { useGlobalUserContext } from "../../contexts/UserContext";
import ProjectsLists from "./ProjectsLists";
import AddTask from "../tasks/TaskForm";
import Tasks from "../tasks/Tasks";
import CreateTeam from "../../team/CreateTeam";
import Teams from "../../team/Teams";
import ProjectListTop from "./ProjectListTop";
import ProjectDesc from "./ProjectDesc";
import Discussions from "../discussions/Discussions";

const Projects = () => {
  const { projects, singleProject, user } = useGlobalUserContext();
  const { title, _id, team, isTeamProject } = singleProject;

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item md={3} xs={12}>
          <ProjectListTop personalPro={true} />
          <ProjectsLists projects={projects} />
          <Teams />
          <CreateTeam />
        </Grid>
        <Grid item md={9} xs={12}>
          {Object.keys(singleProject).length > 0 && (
            <>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <div className="top-header">
                    <Typography
                      className="Typography singleProTitle"
                      color="primary"
                    >
                      {title}
                    </Typography>
                    <ProjectDesc project={singleProject} />
                  </div>
                </Grid>
                <Grid item textAlign="end">
                  <AddTask projectId={_id} />
                </Grid>
              </Grid>

              <Tasks projectId={_id} />
            </>
          )}
          {isTeamProject && <Discussions project={_id} team={team?._id} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Projects;
