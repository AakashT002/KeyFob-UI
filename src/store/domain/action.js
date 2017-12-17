import * as ActionTypes from '../actionTypes';
import Domains from '../../services/Domains';

export const saveDomain = domainObject => ({
  types: [
    ActionTypes.CREATE_DOMAIN_REQUEST,
    ActionTypes.CREATE_DOMAIN_SUCCESS,
    ActionTypes.CREATE_DOMAIN_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Domains.createDomain(domainObject);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const updateDomain = (oldDomainName, newDomainObject) => ({
  types: [
    ActionTypes.EDIT_DOMAIN_REQUEST,
    ActionTypes.EDIT_DOMAIN_SUCCESS,
    ActionTypes.EDIT_DOMAIN_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Domains.updateDomain(oldDomainName, newDomainObject);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export const validateDomain = domainName => ({
  types: [
    ActionTypes.VALIDATE_DOMAIN_REQUEST,
    ActionTypes.VALIDATE_DOMAIN_SUCCESS,
    ActionTypes.VALIDATE_DOMAIN_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Domains.validateDomain(domainName);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export function validateClient(isClientValid) {
  return { type: ActionTypes.VALIDATE_CLIENT, isClientValid };
}

export const loadDomains = () => ({
  types: [
    ActionTypes.FETCH_DOMAINS_REQUEST,
    ActionTypes.FETCH_DOMAINS_SUCCESS,
    ActionTypes.FETCH_DOMAINS_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Domains.getRealms();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  type: '',
});

export const getUser = (list, realm) => ({
  types: [
    ActionTypes.FETCH_USERS_REQUEST,
    ActionTypes.FETCH_USERS_SUCCESS,
    ActionTypes.FETCH_USERS_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Domains.getUsers(list, realm);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  type: '',
});

export const getClient = (list, realm) => ({
  types: [
    ActionTypes.FETCH_CLIENTS_REQUEST,
    ActionTypes.FETCH_CLIENTS_SUCCESS,
    ActionTypes.FETCH_CLIENTS_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Domains.getClients(list, realm);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  type: '',
});

export const getRole = (list, realm) => ({
  types: [
    ActionTypes.FETCH_ROLES_REQUEST,
    ActionTypes.FETCH_ROLES_SUCCESS,
    ActionTypes.FETCH_ROLES_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Domains.getRoles(list, realm);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export function setDomainName(domainName) {
  return { type: ActionTypes.SET_DOMAINNAME, domainName };
}

export const handleRealmDeletion = realmName => ({
  types: [
    ActionTypes.DELETE_REALM_REQUEST,
    ActionTypes.DELETE_REALM_SUCCESS,
    ActionTypes.DELETE_REALM_FAILURE,
  ],
  callAPI: async () => {
    try {
      return await Domains.deleteRealm(realmName);
    } catch (error) {
      throw new Error(error.message);
    }
  },
});

export default loadDomains;
