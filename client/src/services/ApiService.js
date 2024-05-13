import axios from "axios";
import config from "../config/config";

class ApiService {
  constructor(baseURL = config.apiUrl) {
    this.instance = axios.create({
      baseURL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }

  getToken() {
    return (
      this.getDecodedToken("authToken") || this.getDecodedToken("TempToken")
    );
  }

  async requestWithToken(
    method,
    endpoint,
    payload = null,
    tokenKey = "authToken"
  ) {
    const token = this.getDecodedToken(tokenKey);
    const options = {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      data: payload,
    };

    return this.makeRequest(method, endpoint, options);
  }

  async getWithToken(endpoint) {
    return this.requestWithToken("get", endpoint, null, "authToken");
  }

  async postWithToken(endpoint, payload) {
    return this.requestWithToken("post", endpoint, payload, "authToken");
  }

  async postWithOutToken(endpoint, payload) {
    return this.makeRequest("post", endpoint, { data: payload });
  }

  async postFormDataWithOutToken(endpoint, payload) {
    const options = {
      headers: { "Content-Type": "multipart/form-data" },
      data: payload,
    };

    return this.makeRequest("post", endpoint, options);
  }

  async postFormDataWithToken(endpoint, payload, tokenKey = "authToken") {
    const token = this.getDecodedToken(tokenKey);
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    };

    return this.makeRequest("post", endpoint, options);
  }

  async putWithToken(endpoint, payload) {
    return this.requestWithToken("put", endpoint, payload, "authToken");
  }

  async deleteWithToken(endpoint, payload = null) {
    return this.requestWithToken("delete", endpoint, payload, "authToken");
  }

  async getWithOutToken(endpoint) {
    return this.makeRequest("get", endpoint);
  }

  async getWithParams(endpoint, params = {}) {
    const token = this.getDecodedToken("authToken");
    const options = {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      params,
    };

    return this.makeRequest("get", endpoint, options);
  }

  async makeRequest(method, endpoint, options) {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await this.instance.request({
        method,
        url: endpoint,
        ...options,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  getDecodedToken(tokenKey) {
    const undecodedToken = localStorage.getItem(tokenKey);
    return undecodedToken ? JSON.parse(undecodedToken) : null;
  }
}

export default ApiService;
