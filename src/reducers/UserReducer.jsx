export const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "SET_PROJECTS":
      return {
        ...state,
        projects: action.payload,
      };

    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
      };

    case "SET_SINGLE_PROJECT":
      return {
        ...state,
        singleProject: action.payload,
      };

    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };

    case "UPDATE_PROJECT": {
      let tempProjects = state.projects;
      const { projectId, pro } = action.payload;

      tempProjects = tempProjects.map((p) => {
        if (p._id === projectId)
          return {
            ...p,
            title: pro.title,
            description: pro.description,
            start: pro.start,
            end: pro.end,
          };

        return p;
      });

      return {
        ...state,
        projects: tempProjects,
      };
    }

    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((pro) => pro._id !== action.payload),
      };

    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "UPDATE_TASK_STAGE": {
      let tempTasks = state.tasks;
      const { taskId, stage } = action.payload;

      tempTasks = tempTasks.map((task) => {
        if (task._id === taskId) return { ...task, stage };
        return task;
      });

      return {
        ...state,
        tasks: tempTasks,
      };
    }

    case "UPDATE_TASK": {
      let tempTasks = state.tasks;
      const { taskId, task } = action.payload;

      tempTasks = tempTasks.map((t) => {
        if (t._id === taskId)
          return { ...t, name: task.name, description: task.description };
        return t;
      });

      return {
        ...state,
        tasks: tempTasks,
      };
    }

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };

    case "GET_TEAMS":
      return {
        ...state,
        teams: action.payload,
      };

    case "ADD_TEAM":
      return {
        ...state,
        teams: [...state.teams, action.payload],
      };

    case "GET_TEAM_PROJECTS": {
      const { projects, ind } = action.payload;
      let arr = state.teamProjects;
      arr[ind] = projects;

      return {
        ...state,
        teamProjects: arr,
      };
    }

    case "ADD_TEAM_PROJECT": {
      const { project, ind } = action.payload;
      let arr = state.teamProjects;
      if (!arr[ind].includes(project)) arr[ind] = [...arr[ind], project];
      console.log(arr);

      return {
        ...state,
        teamProjects: arr,
      };
    }

    case "UPDATE_TEAM_PROJECT": {
      const { projectId, pro, ind } = action.payload;
      let tempPros = state.teamProjects;

      tempPros[ind] = tempPros[ind]?.map((p) => {
        if (p._id === projectId)
          return {
            ...p,
            title: pro.title,
            description: pro.description,
            start: pro.start,
            end: pro.end,
          };
        return p;
      });

      return {
        ...state,
        teamProjects: tempPros,
      };
    }

    case "DELETE_TEAM_PROJECT": {
      const { id, ind } = action.payload;
      return {
        ...state,
        teamProjects: state.teamProjects[ind].filter((pro) => pro._id !== id),
      };
    }

    case "GET_COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };

    case "ADD_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case "DELETE_COMMENT":
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ),
      };

    case "REMOVE_USER":
      return {
        ...state,
        user: {},
      };

    default:
      return state;
  }
};
