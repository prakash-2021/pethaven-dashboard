import { AuthContext } from "@/context";
import { useContext, useMemo } from "react";
import instance from "./axios";

const WithAxios = ({ children }: { children: any }) => {
  const { logout } = useContext(AuthContext);

  useMemo(() => {
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response.status === 401) logout();
        else return Promise.reject(error);
      }
    );
  }, [logout]);

  return children;
};

export default WithAxios;
