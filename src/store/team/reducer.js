import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialTeamsState = {
  teamList: [],
  requesting: false,
  message: '',
  isError: false,
  isTeamSaved: false,
  teamId: '',
  availableRolesForTeamDomain: [],
  mappedDomains: {},
};

export const team = createReducer(initialTeamsState, {
  [ActionTypes.CREATE_TEAM_REQUEST](state) {
    return { ...state, isError: false };
  },
  [ActionTypes.CREATE_TEAM_SUCCESS](state, action) {
    return {
      ...state,
      message: 'Saved',
      isError: false,
      saving: true,
      isTeamSaved: true,
      teamId: action.response,
    };
  },
  [ActionTypes.CREATE_TEAM_FAILURE](state, action) {
    return {
      ...state,
      requesting: false,
      isError: true,
      message: action.error.message,
      saving: false,
    };
  },
  [ActionTypes.FETCH_TEAMS_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.FETCH_TEAMS_SUCCESS](state, action) {
    return { ...state, teamList: action.response, requesting: false };
  },
  [ActionTypes.FETCH_TEAMS_FAILURE](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.FETCH_TEAM_DOMAIN_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.FETCH_TEAM_DOMAIN_SUCCESS](state, action) {
    return {
      ...state,
      mappedDomains: action.response.clientRoles,
      requesting: false,
    };
  },
  [ActionTypes.FETCH_TEAM_DOMAIN_FAILURE](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.UPDATE_TEAM_REQUEST](state) {
    return { ...state, isError: false };
  },
  [ActionTypes.UPDATE_TEAM_SUCCESS](state) {
    return {
      ...state,
      isTeamSaved: true,
      isError: false,
      message: 'Saved',
    };
  },
  [ActionTypes.UPDATE_TEAM_FAILURE](state, action) {
    return {
      ...state,
      requesting: false,
      isError: true,
      message: action.error.message,
    };
  },
  [ActionTypes.ADD_TEAM](state) {
    return { ...state, isTeamSaved: false };
  },
  [ActionTypes.DELETE_TEAM_REQUEST](state) {
    return { ...state };
  },
  [ActionTypes.DELETE_TEAM_SUCCESS](state) {
    return { ...state };
  },
  [ActionTypes.DELETE_TEAM_FAILURE](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.GET_AVL_ROLES_FOR_TEAM_DOMAIN_REQUEST](state) {
    return { ...state };
  },
  [ActionTypes.GET_AVL_ROLES_FOR_TEAM_DOMAIN_SUCCESS](state, action) {
    return {
      ...state,
      availableRolesForTeamDomain: action.response,
    };
  },
  [ActionTypes.GET_AVL_ROLES_FOR_TEAM_DOMAIN_FAILURE](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.STOP_TEAM_SPINNER](state) {
    return { ...state, requesting: false };
  },
});

export default team;
