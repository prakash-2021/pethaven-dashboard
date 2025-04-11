import React, { ReactNode, useEffect, useState } from "react";

export interface AuthContextInterface {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const authContextDefaults: AuthContextInterface = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext =
  React.createContext<AuthContextInterface>(authContextDefaults);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  const isLoggedIn = Boolean(token);

  const login = (token: string) => setToken(token);

  const logout = () => setToken(null);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token, localStorage]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
