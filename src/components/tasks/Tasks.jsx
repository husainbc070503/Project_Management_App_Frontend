import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useGlobalUserContext } from "../../contexts/UserContext";
import FilteredTasks from "./FilteredTasks";
import "./Tasks.css";

const Tasks = () => {
  const { tasks } = useGlobalUserContext();

  return (
    <Grid container spacing={5} mt={1}>
      {["todo", "inProgress", "completed"].map((stage, index) => {
        const filteredTasks = tasks?.filter((task) => task.stage === stage);
        return (
          <Grid md={4} xs={12} item key={index}>
            <Typography variant="h5" className="Typography stage">
              {stage}
            </Typography>
            <FilteredTasks filteredTasks={filteredTasks} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Tasks;
