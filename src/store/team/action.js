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

export const loadTeamDomains = groupId => ({
  types: [
    ActionTypes.FETCH_TEAM_DOMAIN_REQUEST,
    ActionTypes.FETCH_TEAM_DOMAIN_SUCCESS,
    ActionTypes.FETCH_TEAM_DOMAIN_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Teams.getTeamDomains(groupId);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  type: '',
});

export const saveTeam = teamObject => ({
  types: [
    ActionTypes.CREATE_TEAM_REQUEST,
    ActionTypes.CREATE_TEAM_SUCCESS,
    ActionTypes.CREATE_TEAM_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Teams.createTeam(teamObject);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  type: '',
});

export const updateTeam = (teamObject, id) => ({
  types: [
    ActionTypes.UPDATE_TEAM_REQUEST,
    ActionTypes.UPDATE_TEAM_SUCCESS,
    ActionTypes.UPDATE_TEAM_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Teams.updateTeam(teamObject, id);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  type: '',
});

export function addTeam() {
  return { type: ActionTypes.ADD_TEAM };
}

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

export const handleTeamDomainAssignment = (
  realm,
  teamId,
  teamDomainId,
  teamDomainsArray
) => ({
  types: [
    ActionTypes.ASSIGN_TEAM_DOMAIN_REQUEST,
    ActionTypes.ASSIGN_TEAM_DOMAIN_SUCCESS,
    ActionTypes.ASSIGN_TEAM_DOMAIN_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Teams.assignTeamDomain(
        realm,
        teamId,
        teamDomainId,
        teamDomainsArray
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const getAvailableRolesForTeamDomain = (
  realm,
  teamId,
  teamDomainId
) => ({
  types: [
    ActionTypes.GET_AVL_ROLES_FOR_TEAM_DOMAIN_REQUEST,
    ActionTypes.GET_AVL_ROLES_FOR_TEAM_DOMAIN_SUCCESS,
    ActionTypes.GET_AVL_ROLES_FOR_TEAM_DOMAIN_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Teams.getAvailableRolesForTeamDomain(
        realm,
        teamId,
        teamDomainId
      );
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const unAssignTeamDomain = (realm, id, clientId) => ({
  types: [
    ActionTypes.UNASSIGN_TEAM_DOMAIN_REQUEST,
    ActionTypes.UNASSIGN_TEAM_DOMAIN_SUCCESS,
    ActionTypes.UNASSIGN_TEAM_DOMAIN_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Teams.unAssignTeamDomain(realm, id, clientId);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});
