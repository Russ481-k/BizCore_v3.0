import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { authLoginAPI, AuthLoginResponse } from "api/auth/login";
import { authLogoutAPI, AuthLogoutResponse } from "api/auth/logout";
import { authRefreshAPI, AuthRefreshResponse } from "api/auth/refresh";
import { getMyProfileAPI } from "api/users/current";
import MyProfile from "type/MyProfile";
import UserSendData from "type/UserSendData";
import { removeRefreshTokenCookie, setRefreshTokenCookie } from "./storage";

export const ACCESSTOKEN_TIME_OUT = 29 * 60 * 1000;
export const REFRESHTOKEN_TIME_OUT = 30;

export const authLoginThunk = createAsyncThunk<
  AuthLoginResponse,
  { compId: string; userId: string; password: string },
  {
    rejectValue: {
      resultCode: "FAILURE";
      message: string;
    };
  }
>(
  "auth/login",
  async (
    params: { compId: string; userId: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await authLoginAPI(params);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authRefreshThunk = createAsyncThunk<
  AuthRefreshResponse,
  { refreshToken: string },
  {
    rejectValue: {
      resultCode: "FAILURE";
      message: string;
    };
  }
>(
  "auth/refresh",
  async (params: { refreshToken: string }, { rejectWithValue }) => {
    alert("refreshToken" + params.refreshToken);

    try {
      const result = await authRefreshAPI(params);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const authLogoutThunk = createAsyncThunk<
  AuthLogoutResponse,
  { refreshToken: string },
  {
    rejectValue: {
      resultCode: "FAILURE";
      message: string;
    };
  }
>(
  "auth/logout",
  async (params: { refreshToken: string }, { rejectWithValue }) => {
    try {
      const result = await authLogoutAPI(params);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getMyProfileThunk = createAsyncThunk(
  "user/get-my-profile",
  async () => getMyProfileAPI()
);

interface UserState {
  accessToken: string | null;
  profile: MyProfile;
  sendData: UserSendData;
}
const initialState: UserState = {
  accessToken: null,
  profile: {
    userIdx: 0,
    userId: "",
    userName: "",
    deptName: "",
    isBizCore: false,
    positionName: "",
    status: "",
    authName: "",
    wirelessPhoneNumber: "",
  },
  sendData: {
    sendAuthorization: {
      isSmsUse: false,
      isLmsUse: false,
      isMmsUse: false,
      isKktUse: false,
      isCrsUse: false,
      isSmsUnlimited: false,
      isLmsUnlimited: false,
      isMmsUnlimited: false,
      isKktUnlimited: false,
      isCrsUnlimited: false,
    },
    sendCountRequest: {
      smsLimitCount: null,
      lmsLimitCount: null,
      mmsLimitCount: null,
      kktLimitCount: null,
      crsLimitCount: null,
      smsUseCount: null,
      lmsUseCount: null,
      mmsUseCount: null,
      kktUseCount: null,
      crsUseCount: null,
    },
  },
};

export const { actions, reducer } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeUserData: (state) => {
      removeRefreshTokenCookie();
      state.accessToken = null;
      state.profile = initialState.profile;
      state.sendData = initialState.sendData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authLoginThunk.fulfilled, (state, action) => {
      const data = action.payload.data;
      state.accessToken = data.accessToken;
      setRefreshTokenCookie(data.refreshToken);
    });
    builder.addCase(authLoginThunk.rejected, (state, action) => {
      removeRefreshTokenCookie();
      state.accessToken = null;
      state.profile = initialState.profile;
    });
    builder.addCase(authRefreshThunk.fulfilled, (state, action) => {
      const data = action.payload.data;
      state.accessToken = data.accessToken;
      state.profile = initialState.profile;
    });
    builder.addCase(authRefreshThunk.rejected, (state, action) => {
      removeRefreshTokenCookie();
      state.accessToken = null;
      state.profile = initialState.profile;
    });
    builder.addCase(authLogoutThunk.fulfilled, (state, action) => {
      removeRefreshTokenCookie();
      state.accessToken = null;
      state.profile = initialState.profile;
    });
    builder.addCase(authLogoutThunk.rejected, (state, action) => {
      removeRefreshTokenCookie();
      state.accessToken = null;
      state.profile = initialState.profile;
    });
    builder.addCase(getMyProfileThunk.fulfilled, (state, action) => {
      const data = action.payload.data;
      state.profile.userIdx = data.userIdx;
      state.profile.userId = data.userId;
      state.profile.userName = data.userName;
      state.profile.deptName = data.deptName;
      state.profile.isBizCore = data.isBizCore;
      state.profile.positionName = data.positionName;
      state.profile.status = data.status;
      state.profile.authName = data.authName;
      state.profile.wirelessPhoneNumber = data.wirelessPhoneNumber;
    });
    builder.addCase(getMyProfileThunk.rejected, (state, action) => {
      state.profile = initialState.profile;
    });
  },
});

export const { removeUserData } = actions;

export default reducer;
