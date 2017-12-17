import { IGNORED_CLIENTS, IGNORED_ROLES } from '../utils/constants';

class Domains {
  static async getRealms() {
    const token = sessionStorage.kctoken;
    let result = [];
    // calling the api to fetch realm name
    const response = await fetch(
      `${process.env.REACT_APP_AUTH_URL}/admin/realms`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();

      data.map(realm => {
        return result.push({
          id: realm.id,
          realm: realm.realm,
          clients: [],
          roles: [],
          users: [],
        });
      });

      return result;
    } else {
      throw new Error('Domains could not be fetched.');
    }
  }

  static async getUsers(list, realm) {
    const token = sessionStorage.kctoken;
    // calling the api to fetch number of users for each realm
    const users = await fetch(
      `${process.env.REACT_APP_AUTH_URL}/admin/realms/${realm}/users`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (users.ok) {
      const usersData = await users.json();
      const res = Object.assign([], list);

      res.map(item => {
        if (item.realm === realm) {
          item.users = usersData;
        }
        return item;
      });
      return res;
    } else {
      throw new Error('users could not be fetched.');
    }
  }

  static async getClients(list, realm) {
    const token = sessionStorage.kctoken;
    // calling the api to fetch number of Clients for each realm
    const clients = await fetch(
      `${process.env
        .REACT_APP_AUTH_URL}/admin/realms/${realm}/clients?viewableOnly=true`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (clients.ok) {
      const clientsData = await clients.json();
      const res = Object.assign([], list);
      res.map(item => {
        if (item.realm === realm) {
          let clients = clientsData.filter(client => {
            return !IGNORED_CLIENTS.includes(client.clientId.toString())
              ? item.realm === 'master'
                ? client.clientId.substr(-6) !== '-realm' ? true : false
                : true
              : false;
          });

          item.clients = clients;
        }
        return item;
      });
      return res;
    } else {
      throw new Error('Clients could not be fetched.');
    }
  }

  static async getRoles(list, realm) {
    const token = sessionStorage.kctoken;
    // calling the api to fetch number of roles for each realm
    const roles = await fetch(
      `${process.env.REACT_APP_AUTH_URL}/admin/realms/${realm}/roles`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (roles.ok) {
      const rolesData = await roles.json();
      const res = Object.assign([], list);

      res.map(item => {
        if (item.realm === realm) {
          item.roles = rolesData.filter(role => {
            return !IGNORED_ROLES.includes(role.name.toString());
          });
        }

        return item;
      });
      return res;
    } else {
      throw new Error('Clients could not be fetched.');
    }
  }

  static async createDomain(domainObject) {
    const token = sessionStorage.kctoken;
    const response = await fetch(
      `${process.env.REACT_APP_AUTH_URL}/admin/realms`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(domainObject),
      }
    );

    if (response.status === 201) {
      return response;
    } else if (response.status === 409) {
      throw new Error('Realm already exists.');
    } else {
      throw new Error('Unable to save - Retry after sometime.');
    }

    /*
    if (response.ok) {
      return response;
    } else {
      throw new Error('Domain could not be created.');
    }
    */
  }

  static async updateDomain(oldDomainName, newDomainObject) {
    const token = sessionStorage.kctoken;
    const response = await fetch(
      `${process.env.REACT_APP_AUTH_URL}/admin/realms/${oldDomainName}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newDomainObject),
      }
    );

    if (response.ok) {
      return response;
    } else {
      throw new Error('Domain could not be created.');
    }
  }

  static async validateDomain(domainName) {
    const token = sessionStorage.kctoken;
    const response = await fetch(
      `${process.env.REACT_APP_AUTH_URL}/admin/realms/${domainName}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.ok;
      return data;
    } else {
      throw new Error('Domain already exists.');
    }
  }

  static async deleteRealm(realmName) {
    const token = sessionStorage.kctoken;
    const response = await fetch(
      `${process.env.REACT_APP_AUTH_URL}/admin/realms/${realmName}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      const data = await response.ok;
      return data;
    } else {
      throw new Error('Domain not deleted.');
    }
  }
}

export default Domains;
