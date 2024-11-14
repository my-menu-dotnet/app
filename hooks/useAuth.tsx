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
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}>({
  token: null,
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
  const [token, setToken] = useState<string | null>(null);

  const handleSetToken = useCallback((token: string) => {
    secureStore.save("token", token);
    setToken(token);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  useEffect(() => {
    secureStore.get("token").then((token) => {
      if (!token) return;
      setToken(token);
    });
  }, []);

  useEffect(() => {
    if (!token) return;
    router.replace("/");
  }, [token])

  return (
    <AuthContext.Provider value={{ token, setToken: handleSetToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
