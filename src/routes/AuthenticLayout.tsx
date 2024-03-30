/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAuthLogoutKill } from "features/user";
import { ACCESSTOKEN_TIME_OUT } from "features/user/redux";
import authService from "libs/authService";
import { getCookie } from "storage/cookie";
import { useAppSelector } from "storage/redux/hooks";

function AuthenticLayout() {
  const accessToken = useAppSelector((state) => state.user.accessToken);
  const refreshToken = getCookie("refreshToken");

  const { mutate: authLogoutKill } = useAuthLogoutKill();
  const handleBeforeUnload = useCallback(() => {
    authLogoutKill({
      requestFlag: "1",
      refreshToken: refreshToken,
    });
  }, []);

  const handleAfterLoad = useCallback(() => {
    authLogoutKill({
      requestFlag: "2",
      refreshToken: refreshToken,
    });
  }, []);

  useEffect(() => {
    if (!accessToken && refreshToken) {
      authService.silentRefresh();
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("load", handleAfterLoad);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("load", handleAfterLoad);
    };
  }, []);

  useEffect(() => {
    if (accessToken) {
      const onRefreshTokenTimeOut = setTimeout(() => {
        authService.silentRefresh();
      }, ACCESSTOKEN_TIME_OUT);
      return () => {
        clearTimeout(onRefreshTokenTimeOut);
      };
    }
  }, [accessToken]);

  return <Outlet />;
}

export default AuthenticLayout;
