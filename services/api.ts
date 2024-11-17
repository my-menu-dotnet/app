import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { router } from "expo-router";
import { ReactNode, useEffect, useRef } from "react";
import secureStore from "./secureStore";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (!error.response) {
          return Promise.reject(error);
        }

        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = await secureStore.get("refreshToken");

            const response = await api.post("/auth/refresh-token", {
              refresh_token: refreshToken,
            });
            const data = response.data;

            originalRequest.headers["Authorization"] = `Bearer ${data.token}`;
            api.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${data.token}`;

            return api(originalRequest);
          } catch (refreshError) {
            router.push("/auth/login");
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  return children;
};

export default api;
export { AxiosInterceptor };
