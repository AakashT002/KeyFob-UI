class Clients {
  static async get(currentdomainName) {
    const token = sessionStorage.kctoken;
    const API_URL = `${process.env
      .REACT_APP_AUTH_URL}/admin/realms/${currentdomainName}/clients`;
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Clients could not be fetched.');
    }
  }

  static async createClient(clientObject) {
    const token = sessionStorage.kctoken;
    const response = await fetch(
      `${process.env
        .REACT_APP_AUTH_URL}/admin/realms/${sessionStorage.currentdomainName}/clients`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(clientObject),
      }
    );
    if (response.status === 201) {
      var responseHeader = response.headers.get('Location');
      var clientId = responseHeader.substr(responseHeader.length - 36, 36);
      return clientId;
    } else if (response.status === 409) {
      throw new Error('Client name already exists.');
    } else {
      throw new Error('Unable to save - Retry after sometime.');
    }
  }

  static async updateClient(clientObject, id) {
    const token = sessionStorage.kctoken;
    const response = await fetch(
      `${process.env
        .REACT_APP_AUTH_URL}/admin/realms/${sessionStorage.currentdomainName}/clients/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(clientObject),
      }
    );
    if (response.status === 204) {
      return response;
    } else if (response.status === 409) {
      throw new Error('Client name already exists.');
    } else {
      throw new Error('Unable to save - Retry after sometime.');
    }
  }

  static async delete(id, currentdomainName) {
    const API_URL = `${process.env
      .REACT_APP_AUTH_URL}/admin/realms/${currentdomainName}/clients/${id}`;
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
      throw new Error('Client cannot be removed.');
    }
  }
}

export default Clients;
