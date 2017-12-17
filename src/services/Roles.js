class Roles {
  static async createRole(roleObject, domainName) {
    const token = sessionStorage.kctoken;
    const API_URL = `${process.env
      .REACT_APP_AUTH_URL}/admin/realms/${domainName}/roles`;
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(roleObject),
    });

    if (response.ok) {
      var roleName = roleObject.name;
      const roletoken = sessionStorage.kctoken;
      const API_URL = `${process.env
        .REACT_APP_AUTH_URL}/admin/realms/${domainName}/roles/${roleName}`;
      const roleResponse = await fetch(API_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${roletoken}`,
          'Content-Type': 'application/json',
        },
      });
      if (roleResponse.ok) {
        const rolesData = await roleResponse.json();
        var roleId = rolesData.id;
        return roleId;
      } else {
        throw new Error('Role id cannot be fetched');
      }
    } else {
      throw new Error('Roles cannot be fetched');
    }
  }

  static async getRoles(domainName) {
    const token = sessionStorage.kctoken;
    const API_URL = `${process.env
      .REACT_APP_AUTH_URL}/admin/realms/${domainName}/roles`;
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Roles could not be fetched.');
    }
  }

  static async delete(roleId, currentdomainName) {
    const API_URL = `${process.env
      .REACT_APP_AUTH_URL}/admin/realms/${currentdomainName}/roles-by-id/${roleId}`;
    const token = sessionStorage.kctoken;
    const response = await fetch(API_URL, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.ok) {
      return roleId;
    } else {
      throw new Error('User cannot be added.');
    }
  }
}

export default Roles;
