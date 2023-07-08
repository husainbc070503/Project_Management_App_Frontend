import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, TextField } from "@mui/material";
import { useGlobalUserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";
import EditIcon from "@mui/icons-material/Edit";

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
  name: "",
  description: "",
};

const AddTask = ({ projectId, taskId }) => {
  const { user, dispatch, tasks } = useGlobalUserContext();
  const [open, setOpen] = React.useState(false);
  const [taskDetails, setTaskDetails] = React.useState(initialState);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) =>
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/task/addTask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ ...taskDetails, project: projectId }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Task Added", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "ADD_TASK", payload: data.task });
        setTaskDetails(initialState);
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

  const handleUpdateTask = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/task/updateTaskText/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(taskDetails),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Task Updated", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "UPDATE_TASK", payload: { taskId, task: data.task } });
        setTaskDetails(initialState);
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
    tasks?.forEach((task) => {
      if (task._id === taskId) setTaskDetails(task);
    });
  }, [taskId]);

  return (
    <div>
      {!taskId ? (
        <Button
          onClick={() => setOpen(true)}
          color="secondary"
          variant="contained"
        >
          Add Task
        </Button>
      ) : (
        <EditIcon color="info" onClick={() => setOpen(true)} className="icon" />
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" mb={2}>
            {!taskId ? "Add" : "Edit"} Task
          </Typography>
          <div className="input-group">
            <FormControl fullWidth>
              <TextField
                type="text"
                label="Name"
                name="name"
                value={taskDetails.name}
                onChange={handleChange}
              />
            </FormControl>
          </div>
          <div className="input-group">
            <FormControl fullWidth>
              <TextField
                type="text"
                multiline
                rows={4}
                label="Description"
                name="description"
                value={taskDetails.description}
                onChange={handleChange}
              />
            </FormControl>
          </div>
          <Button
            color="primary"
            variant="contained"
            onClick={!taskId ? handleSubmit : handleUpdateTask}
            disabled={loading}
          >
            {!taskId ? "Add" : "Edit"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTask;
