import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FormControl, FormLabel, TextField } from "@mui/material";
import { useGlobalUserContext } from "../../contexts/UserContext";
import styled from "@emotion/styled";
import { api } from "../../utils/Api";
import { toast } from "react-toastify";

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

const Label = styled(FormLabel)`
  font-size: 20px;
  margin-bottom: 4px;
  color: #001c30;
`;

const AddComment = ({ project, team }) => {
  const [open, setOpen] = React.useState(false);
  const { user, dispatch } = useGlobalUserContext();
  const [comment, setComment] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleAdd = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/comment/addComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ comment, project, team }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Comment Added", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        dispatch({ type: "ADD_COMMENT", payload: data.cmt });
        setOpen(false);
        setComment("");
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
      <Button onClick={() => setOpen(true)} color="primary" variant="contained">
        Add your opinion
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="input-group">
            <FormControl fullWidth>
              <Label>Commenting As</Label>
              <TextField value={user?.user?.name} disabled />
            </FormControl>
          </div>
          <div className="input-group">
            <FormControl fullWidth>
              <Label>Comment</Label>
              <TextField
                name="comment"
                multiline
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </FormControl>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            disabled={loading}
          >
            Add
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddComment;
