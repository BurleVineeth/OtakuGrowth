import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

class ApiService {
  public get(path: string) {
    return axios.get(`${BACKEND_URL}/${path}`);
  }

  public post<T>(path: string, payload: T) {
    return axios.post(`${BACKEND_URL}/${path}`, payload);
  }
}

export const apiService = new ApiService();