import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Grid } from "@mui/material";
import styled from "@emotion/styled";
import UserCard from "../../team/UserCard";
import { useGlobalUserContext } from "../../contexts/UserContext";
import AddUser from "../../team/AddUser";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  maxWidth: "95%",
  background: "#fff",
  borderRadius: 2,
  p: 4,
};

const Desc = styled(Typography)`
  color: #526d82;
  font-size: 16px;
  text-align: justify;
`;

const ProjectDesc = ({ project }) => {
  const [open, setOpen] = React.useState(false);
  const { title, description, _id, team, start, end } = project;
  const { user } = useGlobalUserContext();

  const updateDate = (date) => date.split("-").reverse().join("/");
  const isGrpLeader = team?.teamLeader?._id === user?.user?._id;

  const [loading, setLoading] = React.useState(false);
  const [members, setMembers] = React.useState();

  React.useEffect(() => {
    setMembers(team?.members);
  }, [team?.members]);

  const removeUser = async (userId) => {
    try {
      const res = await fetch(`${api}/api/team/removeFromTeam/${team?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ user: userId }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("User Removed", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setMembers(members.filter((delUser) => delUser._id !== userId));
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
      toast.error("User already added", {
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

  const addUserToTeam = async (addingUser) => {
    if (members.find((member) => member._id === addingUser._id)) {
      return toast.error("User already been added.", {
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

    try {
      const res = await fetch(`${api}/api/team/addToTeam/${team?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ user: addingUser._id }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("User Added", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setMembers([...members, addingUser]);
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
      toast.error("User already added", {
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
    <div className="eye-icon">
      <Button onClick={() => setOpen(true)}>
        <VisibilityIcon color="secondary" />
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" color="primary">
            {title}
          </Typography>
          <Desc
            id="modal-modal-description"
            sx={{ mt: 2 }}
            color="ThreeDLightShadow"
          >
            {description}
          </Desc>
          <Grid container spacing={2} mt={1}>
            <Grid item md={6}>
              <span className="date-title">Start Date: </span>
              <span className="date">{updateDate(start)}</span>
            </Grid>
            <Grid item md={6}>
              <span className="date-title">End Date: </span>
              <span className="date">{updateDate(end)}</span>
            </Grid>
          </Grid>
          <div className="desc-teams">
            {members && (
              <>
                <Typography color="primary" className="Typography team">
                  Team Members
                </Typography>
                {members?.map((u) => {
                  return (
                    <UserCard
                      key={u._id}
                      user={u}
                      isFromProDesc={true}
                      removeUser={removeUser}
                      grpLeaderCanDelete={
                        isGrpLeader && u._id !== team?.teamLeader?._id
                      }
                      noCursor={true}
                    />
                  );
                })}
              </>
            )}
          </div>

          {isGrpLeader && (
            <>
              <Typography color="primary" className="Typography team" mt={5}>
                Add User
              </Typography>
              <AddUser
                loading={loading}
                setLoading={setLoading}
                addUserToTeam={addUserToTeam}
                isFromProDesc={true}
              />
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ProjectDesc;
