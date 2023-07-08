import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, FormLabel, Grid, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { api } from "../../utils/Api";
import { toast } from "react-toastify";
import { useGlobalUserContext } from "../../contexts/UserContext";
import EditIcon from "@mui/icons-material/Edit";
import styled from "@emotion/styled";

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

const initialState = {
  title: "",
  description: "",
  start: "",
  end: "",
};

const EditIconChange = styled(EditIcon)`
  display: inline-block;
  font-size: 16px;
`;

const AddProject = ({ isTeamProject, team, projectId, ind }) => {
  const [open, setOpen] = React.useState(false);
  const [projectDetails, setProjectDetails] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);
  const { user, dispatch, projects, teamProjects } = useGlobalUserContext();

  const handleChange = (e) =>
    setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/project/createProject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(projectDetails),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Project Added", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        isTeamProject
          ? dispatch({
              type: "ADD_TEAM_PROJECT",
              payload: { project: data.project, ind },
            })
          : dispatch({ type: "ADD_PROJECT", payload: data.project });

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

  const handleUpdateProject = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/project/updateProject/${projectId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(projectDetails),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Project Updated", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        isTeamProject
          ? dispatch({
              type: "UPDATE_TEAM_PROJECT",
              payload: { projectId, pro: data.project, ind },
            })
          : dispatch({
              type: "UPDATE_PROJECT",
              payload: { projectId, pro: data.project },
            });
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

  React.useEffect(() => {
    setProjectDetails({ ...projectDetails, isTeamProject, team });
  }, [isTeamProject]);

  React.useEffect(() => {
    (isTeamProject ? teamProjects[ind] : projects)?.map((pro) => {
      if (pro._id === projectId) setProjectDetails(pro);
    });
  }, [projectId]);

  return (
    <div>
      {!projectId ? (
        <div className="add-icon">
          <AddIcon onClick={() => setOpen(true)} />
        </div>
      ) : (
        <EditIconChange
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
        />
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" mb={2}>
            {!projectId ? "Add" : "Edit"} Project
          </Typography>
          <div className="input-group">
            <FormControl fullWidth>
              <TextField
                type="text"
                name="title"
                label="Title"
                value={projectDetails.title}
                onChange={handleChange}
                required
              />
            </FormControl>
          </div>
          <div className="input-group">
            <FormControl fullWidth>
              <TextField
                type="text"
                multiline
                rows={4}
                name="description"
                label="Description"
                value={projectDetails.description}
                onChange={handleChange}
                required
              />
            </FormControl>
          </div>
          <div className="input-group">
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <FormLabel>Start Date</FormLabel>
                  <TextField
                    type="date"
                    name="start"
                    value={projectDetails.start}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item md={6} xs={12}>
                <FormControl fullWidth>
                  <FormLabel>End Date</FormLabel>
                  <TextField
                    type="date"
                    name="end"
                    value={projectDetails.end}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <Button
            color="primary"
            variant="contained"
            onClick={!projectId ? handleSubmit : handleUpdateProject}
            disabled={loading}
          >
            {!projectId ? "Add" : "Edit"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddProject;
