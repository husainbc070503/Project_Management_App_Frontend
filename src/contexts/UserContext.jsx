import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { api } from "../utils/Api";
import { useNavigate } from "react-router-dom";
import { UserReducer } from "../reducers/UserReducer";

const Context = createContext();

const initialState = {
  user: {},
  projects: [],
  singleProject: {},
  tasks: [],
  teams: [],
  teamProjects: [[]],
  comments: [],
};

const UserContext = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const navigate = useNavigate();

  const registerUser = async (auth) => {
    try {
      const res = await fetch(`${api}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auth),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      return error.message;
    }
  };

  const loginUser = async (auth) => {
    try {
      const res = await fetch(`${api}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auth),
      });

      const data = await res.json();
      return data;
    } catch (error) {
      return error.message;
    }
  };

  const getUserProjects = async () => {
    if (state.user) {
      try {
        const res = await fetch(`${api}/api/project/getAllProjects`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.user.token}`,
          },
        });

        const data = await res.json();
        if (data.success)
          dispatch({ type: "SET_PROJECTS", payload: data.projects });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const getSingleProject = async (id) => {
    if (id) {
      try {
        const res = await fetch(`${api}/api/project/getProject/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.user.token}`,
          },
        });

        const data = await res.json();
        if (data.success)
          dispatch({ type: "SET_SINGLE_PROJECT", payload: data.project });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const getTasks = async (id) => {
    if (id) {
      try {
        const res = await fetch(`${api}/api/task/getAllTasks/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.user.token}`,
          },
        });

        const data = await res.json();
        if (data.success) dispatch({ type: "SET_TASKS", payload: data.tasks });
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const getTeams = async () => {
    try {
      const res = await fetch(`${api}/api/team/getTeams`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success) dispatch({ type: "GET_TEAMS", payload: data.teams });
    } catch (error) {
      console.log(error);
    }
  };

  const getTeamProjects = async (id, ind) => {
    try {
      const res = await fetch(`${api}/api/project/getTeamProjects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({
          type: "GET_TEAM_PROJECTS",
          payload: { projects: data.projects, ind },
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getComments = async (id) => {
    try {
      const res = await fetch(`${api}/api/comment/getComments/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state.user.token}`,
        },
      });

      const data = await res.json();
      if (data.success)
        dispatch({ type: "GET_COMMENTS", payload: data.comments });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUserProjects();
    getTasks();
    getTeams();
    getComments();
  }, [state.user]);

  useEffect(() => {
    state.teams.forEach((elem, index) => getTeamProjects(elem._id, index));
  }, [state.teams, state.teamProjects]);

  useEffect(() => {
    const storedUser = localStorage.getItem("project-tool-user");
    if (storedUser)
      dispatch({ type: "SET_USER", payload: JSON.parse(storedUser) });
    else dispatch({ type: "REMOVE_USER" });
  }, [navigate]);

  return (
    <Context.Provider
      value={{
        ...state,
        registerUser,
        loginUser,
        getSingleProject,
        getTasks,
        getComments,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useGlobalUserContext = () => useContext(Context);

export { UserContext, useGlobalUserContext };
