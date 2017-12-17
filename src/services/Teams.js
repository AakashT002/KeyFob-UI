class Teams {
  static async getTeams(domainName) {
    const token = sessionStorage.kctoken;
    const API_URL = `${
      process.env.REACT_APP_AUTH_URL
    }/admin/realms/${domainName}/groups`;
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
}

export default Teams;
