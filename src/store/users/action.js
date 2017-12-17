import * as ActionTypes from '../actionTypes';
import Users from '../../services/Users';

export const fetchUsers = realm => ({
  types: [
    ActionTypes.FETCH_USERS_REQUEST,
    ActionTypes.FETCH_USERS_SUCCESS,
    ActionTypes.FETCH_USERS_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Users.fetchUsers(realm);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const addBlankUser = realm => ({
  types: [
    ActionTypes.ADD_BLANK_USER_REQUEST,
    ActionTypes.ADD_BLANK_USER_SUCCESS,
    ActionTypes.ADD_BLANK_USER_FAILURE,
  ],
  callAPI: async () => {
    try {
      const user = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        realmRoles: [],
        enabled: true,
        credentials: [
          {
            temporary: true,
            type: 'password',
            value: 'password',
          },
        ],
        isUserSaved: false,
        showAsSaved: false,
      };
      const users = await Users.fetchUsers(realm);
      users.unshift(user);
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  },
});
