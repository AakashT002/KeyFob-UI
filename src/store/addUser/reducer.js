import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialUsersState = {
  users: [],
  responseHeaderArray: [],
  requesting: false,
  userValid: false,
  emailValid: false,
  isErrorForUser: false,
  UserFeedbackMessage: '',
  isUserSaved: false,
  userId: '',
};

let newState;
export const addUser = createReducer(initialUsersState, {
  [ActionTypes.CREATE_USER_REQUEST](state) {
    return {
      ...state,
      responseHeader: '',
      requesting: false,
      isErrorForUser: false,
    };
  },

  [ActionTypes.CREATE_USER_SUCCESS](state, action) {
    return {
      ...state,
      requesting: false,
      isUserSaved: true,
      isErrorForUser: false,
      UserFeedbackMessage: 'Saved',
      userId: action.response,
    };
  },

  [ActionTypes.CREATE_USER_FAILURE](state, action) {
    return {
      ...state,
      responseHeader: action.response,
      requesting: false,
      isErrorForUser: true,
      UserFeedbackMessage: action.error.message,
    };
  },

  [ActionTypes.DELETE_USER_REQUEST](state) {
    return { ...state, requesting: true };
  },

  [ActionTypes.DELETE_USER_SUCCESS](state, action) {
    newState = Object.assign({}, state);
    if (newState.responseHeaderArray.length > 0) {
      newState.responseHeaderArray.splice(action.response, 1);
      newState.requesting = false;
    } else if (newState.responseHeaderArray.length === 0) {
      newState.responseHeaderArray = [];
      newState.requesting = false;
    }
    return newState;
  },

  [ActionTypes.DELETE_USER_FAILURE](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.VALIDATE_USER_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.VALIDATE_USER_SUCCESS](state, action) {
    return { ...state, requesting: false, userValid: action.response };
  },
  [ActionTypes.VALIDATE_USER_FAILURE](state) {
    return { ...state, requesting: false, userValid: false };
  },
  [ActionTypes.VALIDATE_EMAIL_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.VALIDATE_EMAIL_SUCCESS](state, action) {
    return { ...state, requesting: false, emailValid: action.response };
  },
  [ActionTypes.VALIDATE_EMAIL_FAILURE](state) {
    return { ...state, requesting: false, emailValid: false };
  },
  [ActionTypes.SET_RESPONSEHEADER](state = initialUsersState) {
    return Object.assign({}, state, {
      userValid: false,
      emailValid: false,
    });
  },
  [ActionTypes.UPDATE_USER_REQUEST](state) {
    return { ...state, requesting: false, isErrorForUser: false };
  },

  [ActionTypes.UPDATE_USER_SUCCESS](state, action) {
    return {
      ...state,
      requesting: false,
      isUserSaved: true,
      isErrorForUser: false,
      UserFeedbackMessage: 'Saved',
      userId: action.response,
    };
  },

  [ActionTypes.UPDATE_USER_FAILURE](state, action) {
    return {
      ...state,
      requesting: false,
      isErrorForUser: true,
      UserFeedbackMessage: action.error.message,
    };
  },

  [ActionTypes.ASSIGN_USER_ROLE_REQUEST](state) {
    return { ...state, requesting: true };
  },

  [ActionTypes.ASSIGN_USER_ROLE_SUCCESS](state) {
    return { ...state, requesting: false };
  },

  [ActionTypes.ASSIGN_USER_ROLE_FAILURE](state, action) {
    return {
      ...state,
      requesting: false,
      UserFeedbackMessage: action.error.message,
    };
  },

  [ActionTypes.UNASSIGN_USER_ROLE_REQUEST](state) {
    return { ...state, requesting: true };
  },

  [ActionTypes.UNASSIGN_USER_ROLE_SUCCESS](state) {
    return { ...state, requesting: false };
  },

  [ActionTypes.UNASSIGN_USER_ROLE_FAILURE](state, action) {
    return {
      ...state,
      requesting: false,
      UserFeedbackMessage: action.error.message,
    };
  },
});

export default addUser;
