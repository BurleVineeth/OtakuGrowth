import axios, { type AxiosRequestConfig } from "axios";
import { BackendRoutes, FILE_UPLOAD_TYPES, LocalStorageKeys } from "../constants";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

class ApiService {
  private axiosInstance = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
  });

  constructor() {
    // Request interceptor: attach access token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor: auto-refresh token
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url?.includes(BackendRoutes.REFRESH)) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401) {
          try {
            const { data: refreshRes } = await this.post(BackendRoutes.REFRESH);
            const newAccessToken = refreshRes.data.accessToken;

            localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
            window.location.href = "/login";
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public get(path: string, options?: AxiosRequestConfig) {
    return this.axiosInstance.get(`/${path}`, options);
  }

  public post<T>(path: string, payload?: T, options?: AxiosRequestConfig) {
    return this.axiosInstance.post(`/${path}`, payload, options);
  }

  public put<T>(path: string, payload?: T, options?: AxiosRequestConfig) {
    return this.axiosInstance.put(`/${path}`, payload, options);
  }

  public delete(path: string, options?: AxiosRequestConfig) {
    return this.axiosInstance.delete(`/${path}`, options);
  }

  public uploadFile(
    file: File | null,
    fileUploadType: FILE_UPLOAD_TYPES,
    options?: {
      public_id?: string;
    }
  ) {
    const formData = new FormData();
    if (file) formData.append("file", file);
    if (fileUploadType === FILE_UPLOAD_TYPES.REPLACE) {
      if (options?.public_id) formData.append("old_public_id", options.public_id);
    }

    return apiService.post(BackendRoutes.REPLACE_FILE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
  }

  public getErrorMessage(error: Error) {
    return axios.isAxiosError(error)
      ? error.response?.data?.message
      : typeof error.message === "string"
        ? error.message
        : "Unexpected Error";
  }
}

export const apiService = new ApiService();
