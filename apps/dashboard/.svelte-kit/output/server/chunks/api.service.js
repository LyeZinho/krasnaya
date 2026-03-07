class ApiService {
  static API_BASE_URL = "/api/v1";
  static async get(endpoint, headers = {}) {
    const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers
      }
    });
    return this.handleResponse(response);
  }
  static async post(endpoint, data, headers = {}) {
    const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...headers
      }
    });
    return this.handleResponse(response);
  }
  static async patch(endpoint, data, headers = {}) {
    const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...headers
      }
    });
    return this.handleResponse(response);
  }
  static async delete(endpoint, headers = {}) {
    const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...headers
      }
    });
    return this.handleResponse(response);
  }
  static async handleResponse(response) {
    if (!response.ok) {
      let errorMessage = "Falha na comunicação com o servidor.";
      try {
        const errorData = await response.json();
        if (errorData.message) errorMessage = errorData.message;
      } catch (e) {
      }
      throw new Error(errorMessage);
    }
    return response.json();
  }
}
async function request(method, endpoint, data, headers) {
  switch (method) {
    case "GET":
      return ApiService.get(endpoint, headers);
    case "POST":
      return ApiService.post(endpoint, data, headers);
    case "PATCH":
      return ApiService.patch(endpoint, data, headers);
    case "DELETE":
      return ApiService.delete(endpoint, headers);
  }
}
export {
  request as r
};
