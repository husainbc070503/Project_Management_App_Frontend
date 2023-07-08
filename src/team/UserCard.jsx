import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";

const Icon = styled(DeleteIcon)`
  font-size: 16px;
  float: right;
  margin-top: 4px;
  cursor: pointer;
`;

const UserCard = ({
  user,
  handleDelete,
  addUser,
  removeUser,
  isFromProDesc,
  grpLeaderCanDelete,
  noCursor,
}) => {
  const { name, profilePic, _id } = user;

  return (
    <div
      variant="outlined"
      className={`user-card ${noCursor && "no-cursor"}`}
      onClick={() => addUser(user)}
    >
      <div className="card-content">
        <div className="card-profile">
          <img src={profilePic} alt={name} />
        </div>
        <Typography className="Typography user-name">{name}</Typography>
      </div>
      {grpLeaderCanDelete && (
        <Icon
          onClick={(e) => {
            e.stopPropagation();
            isFromProDesc ? removeUser(_id) : handleDelete(_id);
          }}
          color="error"
        />
      )}
    </div>
  );
};

export default UserCard;
