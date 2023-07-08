import { Box, Typography } from "@mui/material";
import React from "react";
import AddComment from "./AddComment";
import "./Discussion.css";
import DiscussionTable from "./DiscussionTable";

const Discussions = ({ project, team }) => {
  return (
    <Box>
      <Typography
        className="Typography discuss-heading"
        color="primary"
        mt={8}
        mb={2}
      >
        Discuss With Your Team
      </Typography>
      <DiscussionTable />
      <AddComment project={project} team={team} />
    </Box>
  );
};

export default Discussions;
