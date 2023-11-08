import { useMemo, useState } from "react";
import AuthContext, { AuthContextValue } from "../contexts/AuthContext";
import { cookie } from "../utils/cookie";

export interface AuthContextProviderProps {
  children: React.ReactNode;
}

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [accessToken, setAccessToken] = useState(
    cookie.get("accessToken") ?? ""
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      authenticated: !!accessToken,
      accessToken,

      login: (token) => {
        setAccessToken(token);
        cookie.set("accessToken", token);
      },

      logout: () => {
        setAccessToken("");
        cookie.remove("accessToken");
      },
    }),
    [accessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
