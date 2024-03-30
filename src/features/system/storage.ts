import { removeCookie, setCookie } from "storage/cookie";
import { REFRESHTOKEN_TIME_OUT } from "./redux";

const getRefreshTokenExpireTime = () => {
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + REFRESHTOKEN_TIME_OUT);
  return expireDate;
};

export const setRefreshTokenCookie = (refreshToken: string) => {
  const expires = getRefreshTokenExpireTime();
  setCookie("refreshToken", refreshToken, {
    expires,
    path: "/",
    sameSite: "strict",
    // secure: true,
  });
};

export const removeRefreshTokenCookie = () => {
  removeCookie("refreshToken", {
    path: "/",
    sameSite: "strict",
  });
};
