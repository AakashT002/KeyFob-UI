class Teams {
  static async getTeams(domainName) {
    const token = sessionStorage.kctoken;
    const API_URL = `${process.env.REACT_APP_AUTH_URL}/admin/realms/${
      domainName
    }/groups`;
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

  static async delete(currentdomainName, id) {
    const API_URL = `${process.env.REACT_APP_AUTH_URL}/admin/realms/${
      currentdomainName
    }/groups/${id}`;
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
}

export default Teams;
