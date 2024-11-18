import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

type UserContextProps = {
  user: User;
};

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export function useUser() {
  const value = useContext(UserContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

type UserProviderProps = {
  children: React.ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const { isAuthenticated, logout } = useAuth();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<User> => {
      const { data } = await api.get("/user");
      return data;
    },
    enabled: isAuthenticated,
  });

  if (!user) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
