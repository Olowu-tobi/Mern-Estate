import axios from "axios";
import config from "../config/config";

class ApiService {
  constructor(baseURL = config.apiUrl) {
    this.instance = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
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
    // return undecodedToken ? JSON.stringify(undecodedToken) : null;
    return undecodedToken;
  }

  async requestWithToken(method, endpoint, payload = null, tokenKey = "token") {
    const myToken = this.getDecodedToken(tokenKey);
    const options = {
      headers: myToken ? { Authorization: `Bearer ${myToken}` } : {},
      data: payload,
    };

    return this.makeRequest(method, endpoint, options);
  }

  async getWithToken(endpoint) {
    return this.requestWithToken("get", endpoint, null, "token");
  }

  async postWithToken(endpoint, payload) {
    return this.requestWithToken("post", endpoint, payload, "token");
  }

  async postWithOutToken(endpoint, payload) {
    console.log(payload);
    return this.makeRequest("post", endpoint, { data: payload });
  }

  async postFormDataWithOutToken(endpoint, payload) {
    const options = {
      headers: { "Content-Type": "multipart/form-data" },
      data: payload,
    };

    return this.makeRequest("post", endpoint, options);
  }

  async postFormDataWithToken(endpoint, payload, tokenKey = "token") {
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
    return this.requestWithToken("put", endpoint, payload, "token");
  }

  async deleteWithToken(endpoint, payload = null) {
    return this.requestWithToken("delete", endpoint, payload, "token");
  }

  async getWithOutToken(endpoint) {
    return this.makeRequest("get", endpoint);
  }

  async getWithParams(endpoint, params = {}) {
    const token = this.getDecodedToken("token");
    const options = {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      params,
    };

    return this.makeRequest("get", endpoint, options);
  }

  async postWithParams(endpoint, payload, params = {}) {
    const token = this.getDecodedToken("token");
    const options = {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      params,
      data: payload ? payload : "",
    };

    return this.makeRequest("post", endpoint, options);
  }
}

export default ApiService;
