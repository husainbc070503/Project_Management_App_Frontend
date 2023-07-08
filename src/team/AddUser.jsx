import React, { useState } from "react";
import UserCard from "./UserCard";
import { CircularProgress, FormControl, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { api } from "../utils/Api";
import { useGlobalUserContext } from "../contexts/UserContext";

const style = {
  marginTop: "16px",
};

const AddUser = ({
  members,
  setMembers,
  loading,
  setLoading,
  isFromProDesc,
  addUserToTeam,
}) => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useGlobalUserContext();

  const handleSearch = async (val) => {
    setSearch(val);
    if (!search) {
      toast.error("Please search user", {
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
      setLoading(true);

      const res = await fetch(`${api}/api/user/getUser?search=${val}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        setSearchResults(data.user);
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

  const addUser = (user) => {
    if (members.find((member) => member._id === user._id)) {
      console.log(user);
      return toast.error("User already been added", {
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

    setSearch("");
    setSearchResults([]);
    setMembers([...members, user]);
  };

  return (
    <div style={style}>
      <div className="input-group">
        <FormControl fullWidth>
          <TextField
            label="Search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            required
          />
        </FormControl>
      </div>

      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <div className="search-users">
          {searchResults &&
            searchResults.map((user) => {
              return (
                <UserCard
                  user={user}
                  key={user._id}
                  addUser={isFromProDesc ? addUserToTeam : addUser}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default AddUser;
