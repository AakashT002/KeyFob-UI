import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import { loginReducer } from 'react-redux-modules/lib/reducers/loginReducer';

import addUser from './addUser/reducer';
import client from './client/reducer';
import domain from './domain/reducer';
import role from './roles/reducer';
import team from './team/reducer';
import user from './user/reducer';
import users from './users/reducer';

const root = combineReducers({
  router: routerReducer,
  addUser,
  client,
  domain,
  role,
  team,
  user,
  users,
  ...loginReducer('loginForm'),
});

export default root;
