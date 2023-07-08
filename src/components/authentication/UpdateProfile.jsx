import { Box, Button, Container, FormControl, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import FileField from "./FileField";
import { useGlobalUserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { api } from "../../utils/Api";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const { user } = useGlobalUserContext();
  const [update, setUpdate] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      setLoading(false);
      return toast.error("Please upload ypur profile pic.", {
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

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      setLoading(false);
      return toast.error("JPEG/PNG images are accepted.", {
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
      const url = "https://api.cloudinary.com/v1_1/dztxhls16/image/upload";
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "project-management-tool");
      data.append("class", "dztxhls16");

      const res = await fetch(url, {
        method: "POST",
        body: data,
      });

      const resp = await res.json();
      if (resp) {
        toast.success("Profile Pic Updated.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setUpdate({ ...update, profilePic: resp.url });
        setLoading(false);
      }
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

  const handleChange = (e) =>
    setUpdate({ ...update, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/user/updateProfile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name: update.name,
          email: update.email,
          profilePic: update.profilePic,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Profile Updated.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        localStorage.removeItem("project-tool-user");
        navigate("/");
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

  useEffect(() => {
    setUpdate(user.user);
  }, [user.user]);

  return (
    <Container maxWidth="sm">
      <div className="container">
        <Box>
          <FileField
            title="Update Profile"
            handleUpload={handleUpload}
            profilePic={update?.profilePic}
          />
          <div className="input-group">
            <FormControl fullWidth>
              <TextField
                type="text"
                label="Name"
                name="name"
                value={update?.name}
                onChange={handleChange}
              />
            </FormControl>
          </div>
          <div className="input-group">
            <FormControl fullWidth>
              <TextField
                type="email"
                label="Email"
                name="email"
                value={update?.email}
                onChange={handleChange}
              />
            </FormControl>
          </div>
          <Button
            color="primary"
            variant="contained"
            disabled={loading}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </Box>
      </div>
    </Container>
  );
};

export default UpdateProfile;
