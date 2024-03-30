import {
  authLogoutThunk,
  authRefreshThunk,
  removeUserData,
} from "features/system";
import { getMyProfileThunk } from "features/system";
import { store } from "storage/redux/store";
import { getCookie } from "storage/cookie";

let isRefreshing = false;
let silentRefreshPromise: Promise<void> | null = null;

function authService() {
  const getMyData: () => void = () => {
    store.dispatch(getMyProfileThunk());
  };
  const removeAuthData: () => void = () => {
    store.dispatch(removeUserData());
    window.location.href = "/login";
  };
  const silentRefresh: () => Promise<void> = async () => {
    if (isRefreshing) {
      return silentRefreshPromise as Promise<void>;
    }
    isRefreshing = true;
    silentRefreshPromise = new Promise(async (resolve, reject) => {
      try {
        const refreshToken = getCookie("refreshToken");

        if (refreshToken) {
          const resultAction = await store.dispatch(
            authRefreshThunk({ refreshToken })
          );
          if (authRefreshThunk.rejected.match(resultAction)) {
            const message = resultAction.payload?.message;
            logout();
            reject(new Error(message || "액세스 토큰 갱신 실패"));
          }
          if (authRefreshThunk.fulfilled.match(resultAction)) {
            const profile = store.getState().user.profile.userIdx;
            if (!profile) {
              getMyData();
            }
          }
          resolve();
        } else {
          logout();
        }
      } finally {
        isRefreshing = false;
      }
    });
    return silentRefreshPromise;
  };
  const logout: () => Promise<void> = async () => {
    const refreshToken = getCookie("refreshToken");
    if (refreshToken) {
      const resultAction = await store.dispatch(
        authLogoutThunk({ refreshToken })
      );
      if (authLogoutThunk.rejected.match(resultAction)) {
        const message = resultAction.payload?.message;
        removeAuthData();
        throw new Error(message || "로그아웃 실패");
      }
      window.location.href = "/login";
      return;
    } else {
      removeAuthData();
      throw new Error("리프레시 토큰 없음");
    }
  };
  return {
    getMyData,
    // silentRefresh,
    logout,
  };
}

export default authService();
