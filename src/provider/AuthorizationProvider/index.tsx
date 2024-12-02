"use client";

import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Context = {
  isLoggedIn: boolean;
  login: (email: string) => void;
  logout: () => void;
  email: string | null;
};

const AuthorizationContext = createContext<Context | null>(null);

export const AuthorizationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback((email: string) => {
    setEmail(email);
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
  }, []);

  const logout = useCallback(() => {
    setEmail("");
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  }, []);

  const value: Context = useMemo(
    () => ({
      isLoggedIn,
      email,
      login,
      logout,
    }),
    [email, isLoggedIn, login, logout]
  );
  return (
    <AuthorizationContext.Provider value={value}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export const useAuthorization = () => {
  const authorization = useContext(AuthorizationContext);
  if (!authorization) {
    throw new Error("The value did not pass to Authorization Provider");
  }

  return authorization;
};
