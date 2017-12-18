class User {
  static async add(realm, userObj) {
    const API_URL = `${process.env
      .REACT_APP_AUTH_URL}/admin/realms/${realm}/users`;
    const token = sessionStorage.kctoken;
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(userObj),
    });
    if (response.status === 201) {
      var responseHeader = response.headers.get('Location');
      var userId = responseHeader.substr(responseHeader.length - 36, 36);
      return userId;
    } else if (response.status === 409) {
      throw new Error('Username/email already exists.');
    } else {
      throw new Error('Unable to save - Retry after sometime.');
    }
  }

  static async assignRole(realm, userId, roleObj) {
    const API_URL = `${
      process.env.REACT_APP_AUTH_URL
      }/admin/realms/${realm}/users/${userId}/role-mappings/realm`;
    const token = sessionStorage.kctoken;
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(roleObj),
    });
    if (response.ok) {
      return response;
    } else {
      throw new Error('Unable to assign role.');
    }
  }

  static async delete(currentdomainName, id) {
    const token = sessionStorage.kctoken;
    const API_URL = `${process.env
      .REACT_APP_AUTH_URL}/admin/realms/${currentdomainName}/users/${id}`;
    const response = await fetch(API_URL, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.ok) {
      return id;
    } else {
      throw new Error('User cannot be deleted');
    }
  }

  static async handleUserValidation(userName, realmName) {
    const API_URL = `${process.env
      .REACT_APP_AUTH_URL}/admin/realms/${realmName}/users`;
    const token = sessionStorage.kctoken;
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.ok) {
      const users = await response.json();
      for (var i = 0; i < users.length; i++) {
        if (users[i].username === userName) {
          return false;
        }
      }
      return true;
    } else {
      throw new Error('User already exists.');
    }
  }

  static async getRoles() {
    const API_URL = `${process.env.REACT_APP_AUTH_URL}/realms/${process.env
      .REACT_APP_AUTH_REALM}/protocol/openid-connect/userinfo`;
    const token = sessionStorage.kctoken;
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      var roleId = data['sub'];
      const API_URL_role =
        `${process.env.REACT_APP_AUTH_URL}/admin/realms/${process.env
          .REACT_APP_AUTH_REALM}/users/` +
        roleId +
        '/role-mappings';
      const token_role = sessionStorage.kctoken;
      const response_role = await fetch(API_URL_role, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token_role,
        },
      });
      if (response_role.ok) {
        const data_role = await response_role.json();
        var obj_data = data_role['realmMappings'];
        var rolenames = [];
        for (var i = 0; i < obj_data.length; i++) {
          if (
            obj_data[i].name !== 'uma_authorization' &&
            obj_data[i].name !== 'offline_access'
          ) {
            rolenames.push(obj_data[i].name);
          }
        }
        return rolenames;
      } else {
        throw new Error('User Role cannot be fetched');
      }
    } else {
      throw new Error('User Role cannot be fetched');
    }
  }

  static async updateUser(realm, userObj, id) {
    const API_URL = `${process.env
      .REACT_APP_AUTH_URL}/admin/realms/${realm}/users/${id}`;
    const token = sessionStorage.kctoken;
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(userObj),
    });
    if (response.status === 204) {
      return response;
    } else if (response.status === 409) {
      throw new Error('Username/email already exists.');
    } else {
      throw new Error('Unable to save - Retry after sometime.');
    }
  }

  static async handleEmailValidation(email, realmName) {
    const API_URL = `${process.env
      .REACT_APP_AUTH_URL}/admin/realms/${realmName}/users`;
    const token = sessionStorage.kctoken;
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.ok) {
      const users = await response.json();
      for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
          return false;
        }
      }
      return true;
    } else {
      throw new Error('Client already exists.');
    }
  }

  static async unAssignRoles(realm, userId, roleObj) {
    const API_URL = `${
      process.env.REACT_APP_AUTH_URL
      }/admin/realms/${realm}/users/${userId}/role-mappings/realm`;
    const token = sessionStorage.kctoken;
    const response = await fetch(API_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(roleObj),
    });
    if (response.ok) {
      return response;
    } else {
      throw new Error('Unable to unassign role.');
    }
  }
}

export default User;
