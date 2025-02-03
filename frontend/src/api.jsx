import axios from "axios";
// import Job from "./backend/models/job";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

/** API Class: manages API requests */
class JoblyApi {
  static token = localStorage.getItem("jobly-token") || null;

  /** Generic request function */
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = JoblyApi.token
      ? { Authorization: `Bearer ${JoblyApi.token}` }
      : {};

    try {
      const res = await axios({ url, method, data, headers });
      return res.data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response?.data?.error?.message || "Unknown error";
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Log in user */
  static async login(username, password) {
    let res = await this.request("auth/token", { username, password }, "post");
    this.token = res.token;
    localStorage.setItem("jobly-token", res.token);
    return res.token;
  }

  /** Register user */
  static async register(userData) {
    let res = await this.request("auth/register", userData, "post");
    this.token = res.token;
    localStorage.setItem("jobly-token", res.token);
    return res.token;
  }

  /** Get current user details */
  static async getCurrentUser(username) {
    return (await this.request(`users/${username}`)).user;
  }

  /** Log out user */
  static logout() {
    this.token = null;
    localStorage.removeItem("jobly-token");
  }

  /** Get companies (optionally filtered by name) */
  static async getCompanies(name = "") {
    let res = await this.request("companies", { name });
    return res.companies;
  }

  /** Get company details */
  static async getCompany(handle) {
    return (await this.request(`companies/${handle}`)).company;
  }

  /** Get all jobs */
  static async getJobs() {
    return (await this.request("jobs")).jobs;
  }

  /** Update user profile */
  static async updateProfile(username, data) {
    return (await this.request(`users/${username}`, data, "patch")).user;
  }

  /** Apply to a job */
  static async applyToJob(jobId) {
    await this.request(`jobs/${jobId}/apply`, {}, "post");
  }
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;
