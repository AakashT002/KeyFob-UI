import * as ActionTypes from '../actionTypes';
import User from '../../services/User';

export const setUserPasswordAsTemporary = (realm, userObj) => ({
  types: [
    ActionTypes.SET_TEMP_PASSWORD_REQUEST,
    ActionTypes.SET_TEMP_PASSWORD_SUCCESS,
    ActionTypes.SET_TEMP_PASSWORD_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await User.setTempPassword(realm, userObj);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const handleUserCreation = (realm, userObj) => ({
  types: [
    ActionTypes.CREATE_USER_REQUEST,
    ActionTypes.CREATE_USER_SUCCESS,
    ActionTypes.CREATE_USER_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await User.add(realm, userObj);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const handleUserRoleAssignment = (realm, userId, roles) => ({
  types: [
    ActionTypes.ASSIGN_USER_ROLE_REQUEST,
    ActionTypes.ASSIGN_USER_ROLE_SUCCESS,
    ActionTypes.ASSIGN_USER_ROLE_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await User.assignRoles(realm, userId, roles);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const handleUserDeletion = (str, index) => ({
  types: [
    ActionTypes.DELETE_USER_REQUEST,
    ActionTypes.DELETE_USER_SUCCESS,
    ActionTypes.DELETE_USER_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await User.delete(str, index);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const handleUserValidation = (userName, realmName) => ({
  types: [
    ActionTypes.VALIDATE_USER_REQUEST,
    ActionTypes.VALIDATE_USER_SUCCESS,
    ActionTypes.VALIDATE_USER_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await User.handleUserValidation(userName, realmName);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const handleUserUpdate = (realm, userObj, id) => ({
  types: [
    ActionTypes.UPDATE_USER_REQUEST,
    ActionTypes.UPDATE_USER_SUCCESS,
    ActionTypes.UPDATE_USER_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await User.updateUser(realm, userObj, id);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const handleEmailValidation = (email, realmName) => ({
  types: [
    ActionTypes.VALIDATE_EMAIL_REQUEST,
    ActionTypes.VALIDATE_EMAIL_SUCCESS,
    ActionTypes.VALIDATE_EMAIL_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await User.handleEmailValidation(email, realmName);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export function setResponseHeader() {
  return { type: ActionTypes.SET_RESPONSEHEADER };
}

export const unAssignUserRoles = (realm, userId, roleObj) => ({
  types: [
    ActionTypes.UNASSIGN_USER_ROLE_REQUEST,
    ActionTypes.UNASSIGN_USER_ROLE_SUCCESS,
    ActionTypes.UNASSIGN_USER_ROLE_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await User.unAssignRoles(realm, userId, roleObj);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const handleUserTeamAssignment = (realm, userId, teams) => ({
  types: [
    ActionTypes.ASSIGN_USER_TEAM_REQUEST,
    ActionTypes.ASSIGN_USER_TEAM_SUCCESS,
    ActionTypes.ASSIGN_USER_TEAM_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await User.assignTeams(realm, userId, teams);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const unAssignUserTeams = (realm, userId, teams) => ({
  types: [
    ActionTypes.UNASSIGN_USER_TEAMS_REQUEST,
    ActionTypes.UNASSIGN_USER_TEAMS_SUCCESS,
    ActionTypes.UNASSIGN_USER_TEAMS_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await User.unAssignTeams(realm, userId, teams);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});
