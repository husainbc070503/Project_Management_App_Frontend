import {
  Avatar,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useGlobalUserContext } from "../../contexts/UserContext";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";

const Header = styled(TableCell)`
  color: #1d5b79;
  font-weight: bold;
  font-size: 26px;
`;

const Comment = styled(Typography)`
  font-size: 17px;
  color: #181d31;
`;

const DiscussionTable = () => {
  const { comments, user, dispatch } = useGlobalUserContext();

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${api}/api/comment/deleteComment/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Opinion Deleted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "DELETE_COMMENT", payload: id });
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    comments.length > 0 && (
      <TableContainer sx={{ padding: "20px 0 4rem" }}>
        <Table>
          <TableHead>
            <TableRow>
              <Header width={300}>Member</Header>
              <Header>Opinion</Header>
              <Header align="center">Action</Header>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments?.map((cmt) => {
              const {
                comment,
                user: { profilePic, name, _id },
              } = cmt;

              return (
                <TableRow>
                  <TableCell>
                    <Grid container alignItems="center">
                      <Grid item md={2}>
                        <Avatar src={profilePic} alt={name} />
                      </Grid>
                      <Grid item md={10}>
                        <Comment>{name}</Comment>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Comment>{comment}</Comment>
                  </TableCell>
                  <TableCell align="center">
                    {user?.user?._id === _id && (
                      <DeleteIcon
                        color="error"
                        className="icon"
                        onClick={() => handleDelete(cmt._id)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
};

export default DiscussionTable;
