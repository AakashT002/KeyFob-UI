import * as ActionTypes from '../actionTypes';
import Teams from '../../services/Teams';

export const loadTeams = domainName => ({
  types: [
    ActionTypes.FETCH_TEAMS_REQUEST,
    ActionTypes.FETCH_TEAMS_SUCCESS,
    ActionTypes.FETCH_TEAMS_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Teams.getTeams(domainName);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  type: '',
});

export const handleTeamDeletion = (currentdomainName, id) => ({
  types: [
    ActionTypes.DELETE_TEAM_REQUEST,
    ActionTypes.DELETE_TEAM_SUCCESS,
    ActionTypes.DELETE_TEAM_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Teams.delete(currentdomainName, id);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  type: '',
});
