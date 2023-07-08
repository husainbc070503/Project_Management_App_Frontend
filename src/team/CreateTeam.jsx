import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, Grid, TextField } from "@mui/material";
import { api } from "../utils/Api";
import { toast } from "react-toastify";
import { useGlobalUserContext } from "../contexts/UserContext";
import "./Team.css";
import styled from "@emotion/styled";
import UserCard from "./UserCard";
import AddUser from "./AddUser";

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

const CreateBtn = styled(Button)`
  margin-top: 20px;
`;

const CreateTeam = () => {
  const { user, dispatch } = useGlobalUserContext();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [name, setName] = React.useState("");
  const [members, setMembers] = React.useState([]);

  const createTeam = async () => {
    setLoading(true);

    if (!name || !members) {
      setLoading(false);
      return toast.error("Please fill the required fields", {
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
      const res = await fetch(`${api}/api/team/createTeam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ name, members: JSON.stringify(members) }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Team Created", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "ADD_TEAM", payload: data.team });
        setName("");
        setMembers([]);
        setOpen(false);
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  const handleDelete = (id) =>
    setMembers(members.filter((user) => user._id !== id));

  return (
    <div>
      <CreateBtn
        onClick={() => setOpen(true)}
        variant="contained"
        color="primary"
      >
        Form Team
      </CreateBtn>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" mb={3}>
            Create Theme
          </Typography>
          <div className="input-group">
            <FormControl fullWidth>
              <TextField
                label="Group Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormControl>
          </div>

          <AddUser
            members={members}
            setMembers={setMembers}
            loading={loading}
            setLoading={setLoading}
            searchingUser={true}
          />

          {members.length > 0 && (
            <>
              <Typography className="Typography members" color="primary">
                Members
              </Typography>
              <Grid container spacing={2}>
                {members.map((member) => {
                  return (
                    <Grid item md={4} xs={6} key={member._id}>
                      <UserCard
                        user={member}
                        grpLeaderCanDelete={true}
                        handleDelete={handleDelete}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}

          <CreateBtn color="primary" variant="contained" onClick={createTeam}>
            Create
          </CreateBtn>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateTeam;
