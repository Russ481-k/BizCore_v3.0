/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { getMySendDataThunk, useAuthLogoutKill } from "features/user";
import { ACCESSTOKEN_TIME_OUT } from "features/user/redux";
import authService from "libs/authService";
import { getCookie } from "storage/cookie";
import { useAppDispatch, useAppSelector } from "storage/redux/hooks";

function AuthenticLayout() {
  const dispatch = useAppDispatch();

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

  const fetchSendData = useCallback(() => {
    dispatch(getMySendDataThunk());
  }, [dispatch]);

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
      const fetchSendDataInterval = setInterval(fetchSendData, 30000);
      const onRefreshTokenTimeOut = setTimeout(() => {
        authService.silentRefresh();
      }, ACCESSTOKEN_TIME_OUT);
      return () => {
        clearTimeout(onRefreshTokenTimeOut);
        clearInterval(fetchSendDataInterval);
      };
    }
  }, [accessToken]);

  return <Outlet />;
}

export default AuthenticLayout;
