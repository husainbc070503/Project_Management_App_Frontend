import { Button, FormControl, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import TextField from "./TextField";
import styled from "@emotion/styled";
import FileField from "./FileField";
import user from "../../images/user.png";
import { toast } from "react-toastify";
import { useGlobalUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

const Text = styled(Typography)`
  color: #2d4356;
  font-size: 14px;
  cursor: pointer;
  text-align: end;

  @media (max-width: 890px) {
    font-size: 12px;
  }
`;

const initialState = {
  name: "",
  email: "",
  password: "",
  cpassword: "",
  profilePic: user,
};

const AuthForm = () => {
  const [login, setLogin] = useState(true);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(initialState);
  const navigate = useNavigate();

  const { registerUser, loginUser } = useGlobalUserContext();

  const handleUpload = async (file) => {
    setLoading(true);

    if (file === undefined) {
      setLoading(false);
      return toast.error("Please upload your profile pic.", {
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
        toast.success("Profile pic uploaded successfully.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setAuth({ ...auth, profilePic: resp.url });
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
    setAuth({ ...auth, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);

    if (login) {
      const data = await loginUser({
        email: auth.email,
        password: auth.password,
      });

      if (data.success) {
        toast.success("Loggedin.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setAuth(initialState);
        localStorage.setItem("project-tool-user", JSON.stringify(data.user));
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
    } else {
      if (auth.password !== auth.cpassword) {
        setLoading(false);
        return toast.error("Mismatch Passwords", {
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

      const data = await registerUser(auth);
      if (data.success) {
        toast.success("Registered.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setAuth(initialState);
        setLogin(true);
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
    }

    setLoading(false);
  };

  return (
    <div className="auth-form">
      {login ? (
        <Typography className="Typography title auth">Login</Typography>
      ) : (
        <FileField
          title="Register"
          handleUpload={handleUpload}
          profilePic={auth.profilePic}
        />
      )}

      {!login && (
        <TextField
          type="text"
          name="name"
          value={auth.name}
          handleChange={handleChange}
          title="Name"
          icon={<PersonIcon />}
        />
      )}

      <TextField
        type="email"
        name="email"
        value={auth.email}
        handleChange={handleChange}
        icon={<EmailIcon />}
        title="Email"
      />

      <TextField
        type="password"
        name="password"
        icon={<VisibilityIcon />}
        passIcon={<VisibilityOffIcon />}
        show={show}
        setShow={() => setShow(!show)}
        title="Password"
        value={auth.password}
        handleChange={handleChange}
      />

      {!login && (
        <>
          <TextField
            type="password"
            name="cpassword"
            icon={<VisibilityIcon />}
            passIcon={<VisibilityOffIcon />}
            show={show}
            setShow={() => setShow(!show)}
            title="Confirm Password"
            value={auth.cpassword}
            handleChange={handleChange}
          />
        </>
      )}

      <Grid container spacing={2} alignItems="center" marginTop={5}>
        <Grid item md={6} xs={6}>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            Sign {login ? "in" : "up"}
          </Button>
        </Grid>
        <Grid item md={6} xs={6}>
          <Text onClick={() => setLogin(!login)}>
            {login
              ? "Don't have an account? Register"
              : "Account exists? Login"}
          </Text>
        </Grid>
      </Grid>

      {login && <ForgotPassword />}
    </div>
  );
};

export default AuthForm;
