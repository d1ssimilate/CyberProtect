import { createContext, useEffect, useMemo, useState } from "react";
import { AuthContextType, User } from "./AuthProvider.types";
import { ReactNode } from "@tanstack/react-router";
import { useCookie } from "../../hooks/useCookie";
import { useQuery } from "@tanstack/react-query";
import { adminApiService } from "../../api/entities/admin/admin.api";
import { AxiosError } from "axios";

export const AuthContext = createContext<AuthContextType>({
  user: { isAuth: false },
  admin: { isAuth: false },
});

export const AuthProvider = ({ children }: ReactNode) => {
  const { getCookie, clearCookies, setCookie } = useMemo(() => useCookie(), []);
  const [user, setUser] = useState<User>({
    isAuth: getCookie("l") ? true : false,
  });
  const [admin, setAdmin] = useState<User>({
    isAuth: getCookie("a") ? true : false,
  });

  if (getCookie("a") || getCookie("l")) {
    const { data: adminData, error: adminError } = useQuery({
      queryKey: ["admin"],
      queryFn: () => adminApiService.adminCheckToken(),
      enabled: !!getCookie("a"),
    });
    const { data: userData, error: userError } = useQuery({
      queryKey: ["user"],
      queryFn: () => adminApiService.adminCheckToken(),
      enabled: !!getCookie("l"),
    });

    useEffect(() => {
      if (userData?.data) setUser({ ...userData.data, isAuth: true });
      if (adminData?.data) setAdmin({ ...adminData.data, isAuth: true });
    }, [userData?.data, adminData?.data]);

    // useEffect(() => {
    //   if (userError instanceof AxiosError || adminError instanceof AxiosError) {
    //     if (userError.) {
    //       clearCookies("a");
    //       if (window.location.pathname === "/admin/dashboard")
    //         window.location.pathname = "/login";
    //     }
    //   }
    // }, [error, setCookie]);
  }

  return (
    <AuthContext.Provider value={{ user, admin }}>
      {children}
    </AuthContext.Provider>
  );
};
