class Teams {
  static async getTeams(domainName) {
    const token = sessionStorage.kctoken;
    const API_URL = `${process.env
      .REACT_APP_AUTH_URL}/admin/realms/${domainName}/groups`;
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
      throw new Error('Teams could not be fetched.');
    }
  }

  static async getTeamDomains(groupId) {
    const token = sessionStorage.kctoken;
    const API_URL = `${process.env
      .REACT_APP_AUTH_URL}/admin/realms/master/groups/${groupId}`;
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
      throw new Error('Team domains could not be fetched.');
    }
  }

  static async createTeam(teamObject) {
    const token = sessionStorage.kctoken;
    const response = await fetch(
      `${process.env
        .REACT_APP_AUTH_URL}/admin/realms/${sessionStorage.currentdomainName}/groups`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(teamObject),
      }
    );
    if (response.status === 201) {
      var responseHeader = response.headers.get('Location');
      var teamId = responseHeader.substr(responseHeader.length - 36, 36);
      return teamId;
    } else if (response.status === 409) {
      throw new Error('Team name already exists.');
    } else {
      throw new Error('Unable to save - Retry after sometime.');
    }
  }

  static async updateTeam(teamObject, id) {
    const token = sessionStorage.kctoken;
    const response = await fetch(
      `${process.env
        .REACT_APP_AUTH_URL}/admin/realms/${sessionStorage.currentdomainName}/groups/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(teamObject),
      }
    );
    if (response.status === 204) {
      return response;
    } else if (response.status === 409) {
      throw new Error('Group name already exists.');
    } else {
      throw new Error('Unable to save - Retry after sometime.');
    }
  }

  static async delete(currentdomainName, id) {
    const API_URL = `${process.env
      .REACT_APP_AUTH_URL}/admin/realms/${currentdomainName}/groups/${id}`;
    const token = sessionStorage.kctoken;
    const response = await fetch(API_URL, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });

    if (response.ok) {
      return id;
    } else {
      throw new Error('Team cannot be removed.');
    }
  }

  static async assignTeamDomain(realm, teamId, teamDomainId, teamDomainsArray) {
    const API_URL = `${process.env
      .REACT_APP_AUTH_URL}/admin/realms/${realm}/groups/${teamId}/role-mappings/clients/${teamDomainId}`;
    const token = sessionStorage.kctoken;
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(teamDomainsArray),
    });
    if (response.ok) {
      return response;
    } else {
      throw new Error('Unable to assign domain role.');
    }
  }

  static async getAvailableRolesForTeamDomain(realm, teamId, teamDomainId) {
    const API_URL = `${process.env
      .REACT_APP_AUTH_URL}/admin/realms/${realm}/groups/${teamId}/role-mappings/clients/${teamDomainId}/available`;
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
      return data;
    } else {
      throw new Error('Unable to assign domain role.');
    }
  }

  static async unAssignTeamDomain(realm, teamId, clientId) {
    const API_URL = `${process.env
      .REACT_APP_AUTH_URL}/admin/realms/${realm}/groups/${teamId}/role-mappings/clients/${clientId}`;
    const token = sessionStorage.kctoken;
    const response = await fetch(API_URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.ok) {
      return response;
    } else {
      throw new Error('Unable to unassign domain role.');
    }
  }
}

export default Teams;
