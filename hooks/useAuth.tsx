import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

const AuthContext = createContext<{
  user: any;
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
}>({
  user: null,
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

  const logout = useCallback(() => {
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user: null, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
