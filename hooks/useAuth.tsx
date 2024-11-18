import api from "@/services/api";
import secureStore from "@/services/secureStore";
import { router } from "expo-router";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<{
  isAuthenticated: boolean;
  setToken: (token: string, refreshToken: string) => void;
  logout: () => void;
}>({
  isAuthenticated: false,
  setToken: () => {},
  logout: () => {},
});

export function useAuth() {
  const value = useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const handleSetToken = useCallback((token: string, refreshToken: string) => {
    secureStore.save("refreshToken", refreshToken);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setRefreshToken(refreshToken);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    secureStore.remove("refreshToken");
    api.defaults.headers.common["Authorization"] = "";
    setRefreshToken(null);
    setIsAuthenticated(false);
  }, []);

  const fetchRefreshToken = async (refresh?: string) => {
    const data = (
      await api.post("/auth/refresh-token", {
        refresh_token: refresh || refreshToken,
      })
    ).data;

    handleSetToken(data.token, data.refresh_token);

    return data;
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await secureStore.get("refreshToken");
        if (!token) {
          logout();
          return;
        }
        await fetchRefreshToken(token);
      } catch (error) {
        logout();
      }
    })();
  }, []);

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
            const data = await fetchRefreshToken();
            originalRequest.headers["Authorization"] = `Bearer ${data.token}`;
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

  if (isAuthenticated == null) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setToken: handleSetToken, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
