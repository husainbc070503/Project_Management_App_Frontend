import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import logo from "../images/logo.jpeg";
import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalUserContext } from "../contexts/UserContext";
import MenuIcon from "@mui/icons-material/Menu";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";

const NavHeading = styled(Typography)`
  font-size: 22px;
  margin-left: 12px;
  font-weight: bold;

  @media (max-width: 890px) {
    font-size: 22px;
  }
`;

const Navbar = () => {
  const { user } = useGlobalUserContext();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("project-tool-user");
    navigate("../auth");
    toast.info("You have been logged out", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className="AppBar nav">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <div className="logo" onClick={() => navigate("/")}>
              <img src={logo} alt="logo" />
            </div>
            <NavHeading>Project Management Tool</NavHeading>
          </Box>

          <div className="menu-icon">
            {!open ? (
              <MenuIcon onClick={() => setOpen(!open)} />
            ) : (
              <CloseIcon onClick={() => setOpen(!open)} />
            )}
          </div>

          <div className={`links ${open && "open"}`}>
            <>
              {user?.user && (
                <>
                  <Typography
                    onClick={handleLogout}
                    marginRight={2}
                    className="Typography logout"
                  >
                    Logout
                  </Typography>
                  <Link to="updateProfile" className="nav-link">
                    Update Profile
                  </Link>
                </>
              )}
              <Button
                color="secondary"
                variant="contained"
                onClick={() => !user?.user && navigate("auth")}
                className="Button mobile-btn"
              >
                {user?.user ? (
                  <>
                    <img
                      src={user?.user?.profilePic}
                      alt="profile"
                      className="btn-profile"
                    />
                    <Typography>{user?.user?.name}</Typography>
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
