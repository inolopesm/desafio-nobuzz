import { createContext } from "react";

export interface AuthContextValue {
  authenticated: boolean;
  accessToken: string;
  login(accessToken: string): void;
  logout(): void;
}

const AuthContext = createContext(null as unknown as AuthContextValue);

export default AuthContext;
