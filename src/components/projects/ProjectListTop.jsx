import { Grid, Typography } from "@mui/material";
import React from "react";
import AddProject from "./AddProject";

const ProjectListTop = ({
  isTeamProject,
  team,
  ind,
  personalPro,
  isGrpLeader,
}) => {
  return (
    <Grid container alignItems="center">
      <Grid item md={10} xs={8}>
        <Typography color="teal" className="Typography heading">
          Projects
        </Typography>
      </Grid>
      <Grid item md={2} xs={4}>
        {(personalPro || isGrpLeader) && (
          <AddProject isTeamProject={isTeamProject} team={team} ind={ind} />
        )}
      </Grid>
    </Grid>
  );
};

export default ProjectListTop;
