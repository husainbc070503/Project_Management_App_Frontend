import { Grid, Typography } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";

const FileField = ({ title, handleUpload, profilePic }) => {
  return (
    <Grid container justifyContent="space-between">
      <Grid item md={8}>
        <Typography className="Typography title auth">{title}</Typography>
      </Grid>
      <Grid item md={4} xs={12}>
        <div className="profile">
          <img src={profilePic} alt={title} />
          <label htmlFor="profile">
            <EditIcon color="primary" />
          </label>
          <input
            type="file"
            id="profile"
            onChange={(e) => handleUpload(e.target.files[0])}
            style={{ display: "none" }}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default FileField;
