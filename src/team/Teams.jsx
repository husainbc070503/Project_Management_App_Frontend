import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobalUserContext } from "../contexts/UserContext";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import ProjectsLists from "../components/projects/ProjectsLists";
import "./Team.css";
import ProjectListTop from "../components/projects/ProjectListTop";

const Teams = () => {
  const { teams, teamProjects, user } = useGlobalUserContext();
  const [updatedTeams, setUpdatedTeams] = useState();

  const handleClick = async (id) =>
    setUpdatedTeams(
      updatedTeams.map((team) => {
        if (team._id === id) return { ...team, open: !team.open };
        return team;
      })
    );

  useEffect(() => {
    setUpdatedTeams(
      teams.map((team) => {
        return { ...team, open: false };
      })
    );
  }, [teams]);

  return (
    <Box>
      <Typography color="primary" className="Typography heading">
        Teams
      </Typography>
      <div className="team-lists">
        {updatedTeams &&
          updatedTeams.map((team, ind) => {
            const { name, open, _id, teamLeader } = team;
            return (
              <div className="teams" key={_id}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className="Grid team-card"
                  onClick={() => handleClick(_id)}
                >
                  <Grid item md={10}>
                    <Typography className="Typography teamname">
                      {name}
                    </Typography>
                  </Grid>
                  <Grid item md={2}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </Grid>
                </Grid>
                <Box>
                  {open && (
                    <div className="team">
                      <ProjectListTop
                        isTeamProject={true}
                        team={_id}
                        ind={ind}
                        isGrpLeader={teamLeader._id === user?.user?._id}
                      />
                      <ProjectsLists
                        projects={teamProjects[ind]}
                        isTeam={true}
                        ind={ind}
                      />
                    </div>
                  )}
                </Box>
              </div>
            );
          })}
      </div>
    </Box>
  );
};

export default Teams;
