import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ShareIcon from "@mui/icons-material/Share";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import styled from "@emotion/styled";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";
import { useGlobalUserContext } from "../../contexts/UserContext";

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

const Change = styled(Button)`
  margin-top: 23px;
`;

const Label = styled(FormControlLabel)`
  text-transform: capitalize;
  margin-top: 5px;
  margin-right: 20px;
`;

const EditTaskStage = ({ taskId }) => {
  const [open, setOpen] = React.useState(false);
  const [stage, setStage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { user, dispatch } = useGlobalUserContext();

  const handlesSubmit = async () => {
    setLoading(true);

    if (!stage) {
      setLoading(false);
      return toast.error("Please select stage.", {
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
      const res = await fetch(`${api}/api/task/updateTaskStage/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ stage }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Task Stage Updated.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "UPDATE_TASK_STAGE", payload: { taskId, stage } });
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

  return (
    <div>
      <ShareIcon color="primary" onClick={() => setOpen(true)} className="icon"/>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5">
            Change Stage
          </Typography>
          <FormControl fullWidth>
            <RadioGroup row>
              {["todo", "inProgress", "completed"].map((stg, index) => {
                return (
                  <Label
                    key={index}
                    value={stg}
                    label={stg}
                    control={<Radio />}
                    onChange={(e) => setStage(e.target.value)}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
          <Change
            variant="contained"
            color="primary"
            onClick={handlesSubmit}
            disabled={loading}
          >
            Change
          </Change>
        </Box>
      </Modal>
    </div>
  );
};

export default EditTaskStage;
