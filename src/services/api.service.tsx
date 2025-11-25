import axios, { type AxiosRequestConfig } from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

class ApiService {
  public get(path: string) {
    return axios.get(`${BACKEND_URL}/${path}`);
  }

  public post<T>(path: string, payload: T, options?: AxiosRequestConfig) {
    return axios.post(`${BACKEND_URL}/${path}`, payload, options);
  }

  public getErrorMessage(error: Error) {
    return axios.isAxiosError(error)
      ? error.response?.data?.message
      : typeof error.message === 'string' ? error.message : 'Unexpected Error';
  }
}

export const apiService = new ApiService();