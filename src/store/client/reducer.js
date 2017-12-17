import createReducer from '../createReducer';
import * as ActionTypes from '../actionTypes';

const initialClientsState = {
  clientValid: false,
  requesting: false,
  loading: false,
  clientList: [],
  isClientSaved: false,
  isError: false,
  feedbackMessage: '',
  clientId: '',
};

export const client = createReducer(initialClientsState, {
  [ActionTypes.FETCH_CLIENTS_REQUEST](state) {
    return { ...state, requesting: true };
  },
  [ActionTypes.FETCH_CLIENTS_SUCCESS](state, action) {
    return { ...state, clientList: action.response };
  },
  [ActionTypes.FETCH_CLIENTS_FAILURE](state) {
    return { ...state, clientList: [], requesting: false };
  },
  [ActionTypes.CREATE_CLIENT_REQUEST](state) {
    return { ...state, isError: false };
  },
  [ActionTypes.CREATE_CLIENT_SUCCESS](state, action) {
    return {
      ...state,
      requesting: false,
      isClientSaved: true,
      isError: false,
      clientId: action.response,
      feedbackMessage: 'Saved',
    };
  },
  [ActionTypes.CREATE_CLIENT_FAILURE](state, action) {
    return {
      ...state,
      requesting: false,
      isError: true,
      feedbackMessage: action.error.message,
    };
  },
  [ActionTypes.ADD_CLIENT](state) {
    return { ...state, isClientSaved: false };
  },
  [ActionTypes.UPDATE_CLIENT_REQUEST](state) {
    return { ...state, isError: false };
  },
  [ActionTypes.UPDATE_CLIENT_SUCCESS](state) {
    return {
      ...state,
      requesting: false,
      isClientSaved: true,
      isError: false,
      feedbackMessage: 'Saved',
    };
  },
  [ActionTypes.UPDATE_CLIENT_FAILURE](state, action) {
    return {
      ...state,
      requesting: false,
      isError: true,
      feedbackMessage: action.error.message,
    };
  },
  [ActionTypes.DELETE_CLIENT_REQUEST](state) {
    return { ...state };
  },
  [ActionTypes.DELETE_CLIENT_SUCCESS](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.DELETE_CLIENT_FAILURE](state) {
    return { ...state, requesting: false };
  },
  [ActionTypes.STOP_CLIENT_SPINNER](state) {
    return { ...state, requesting: false };
  },
});

export default client;
