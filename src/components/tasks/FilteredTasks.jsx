import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTaskStage from "./EditTaskStage";
import AddTask from "./TaskForm";
import { api } from "../../utils/Api";
import { useGlobalUserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";

const FilteredTasks = ({ filteredTasks }) => {
  const { user, dispatch } = useGlobalUserContext();

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${api}/api/task/deleteTask/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Task Deleted", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "DELETE_TASK", payload: id });
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
    filteredTasks.length > 0 &&
    filteredTasks.map((task) => {
      const { name, description, _id, stage } = task;
      return (
        <Card
          variant="outlined"
          key={_id}
          className={`Card task-card ${stage === "completed" && "completed"}`}
        >
          <CardContent>
            <Typography variant="h5" className="Typography card-title">
              {name}
            </Typography>
            <Typography className="Typography card-description">
              {description}
            </Typography>
          </CardContent>
          {stage !== "completed" && (
            <CardActions>
              <EditTaskStage taskId={_id} />
              <AddTask taskId={_id} />
              <DeleteIcon
                color="error"
                className="icon"
                onClick={() => deleteTask(_id)}
              />
            </CardActions>
          )}
        </Card>
      );
    })
  );
};

export default FilteredTasks;
