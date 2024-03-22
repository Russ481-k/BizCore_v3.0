import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { authLoginAPI, AuthLoginResponse } from "api/auth/login";
import { authLogoutAPI, AuthLogoutResponse } from "api/auth/logout";
import { authRefreshAPI, AuthRefreshResponse } from "api/auth/refresh";
import { getMyProfileAPI, getMySendDataAPI } from "api/users/current";
import MyProfile from "type/MyProfile";
import UserSendData from "type/UserSendData";
import { removeRefreshTokenCookie, setRefreshTokenCookie } from "./storage";

export const ACCESSTOKEN_TIME_OUT = 29 * 60 * 1000;
export const REFRESHTOKEN_TIME_OUT = 30;

export const authLoginThunk = createAsyncThunk<
  AuthLoginResponse,
  { userId: string; password: string },
  {
    rejectValue: {
      resultCode: "FAILURE";
      message: string;
    };
  }
>(
  "auth/login",
  async (params: { userId: string; password: string }, { rejectWithValue }) => {
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
export const getMySendDataThunk = createAsyncThunk(
  "user/get-my-send-count",
  async () => getMySendDataAPI()
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
    isMobytalk: false,
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
      state.profile.isMobytalk = data.isMobytalk;
      state.profile.positionName = data.positionName;
      state.profile.status = data.status;
      state.profile.authName = data.authName;
      state.profile.wirelessPhoneNumber = data.wirelessPhoneNumber;
    });
    builder.addCase(getMyProfileThunk.rejected, (state, action) => {
      state.profile = initialState.profile;
    });
    builder.addCase(getMySendDataThunk.fulfilled, (state, action) => {
      const data = action.payload.data;
      state.sendData.sendAuthorization.isSmsUse =
        data.sendAuthorization.isSmsUse;
      state.sendData.sendAuthorization.isLmsUse =
        data.sendAuthorization.isLmsUse;
      state.sendData.sendAuthorization.isMmsUse =
        data.sendAuthorization.isMmsUse;
      state.sendData.sendAuthorization.isKktUse =
        data.sendAuthorization.isKktUse;
      state.sendData.sendAuthorization.isCrsUse =
        data.sendAuthorization.isCrsUse;
      state.sendData.sendAuthorization.isSmsUnlimited =
        data.sendAuthorization.isSmsUnlimited;
      state.sendData.sendAuthorization.isLmsUnlimited =
        data.sendAuthorization.isLmsUnlimited;
      state.sendData.sendAuthorization.isMmsUnlimited =
        data.sendAuthorization.isMmsUnlimited;
      state.sendData.sendAuthorization.isKktUnlimited =
        data.sendAuthorization.isKktUnlimited;
      state.sendData.sendAuthorization.isCrsUnlimited =
        data.sendAuthorization.isCrsUnlimited;
      state.sendData.sendAuthorization.isCrsUnlimited =
        data.sendAuthorization.isCrsUnlimited;
      state.sendData.sendCountRequest.smsLimitCount =
        data.sendCountRequest?.smsLimitCount;
      state.sendData.sendCountRequest.lmsLimitCount =
        data.sendCountRequest?.lmsLimitCount;
      state.sendData.sendCountRequest.mmsLimitCount =
        data.sendCountRequest?.mmsLimitCount;
      state.sendData.sendCountRequest.kktLimitCount =
        data.sendCountRequest?.kktLimitCount;
      state.sendData.sendCountRequest.crsLimitCount =
        data.sendCountRequest?.crsLimitCount;
      state.sendData.sendCountRequest.smsUseCount =
        data.sendCountRequest?.smsUseCount;
      state.sendData.sendCountRequest.lmsUseCount =
        data.sendCountRequest?.lmsUseCount;
      state.sendData.sendCountRequest.mmsUseCount =
        data.sendCountRequest?.mmsUseCount;
      state.sendData.sendCountRequest.kktUseCount =
        data.sendCountRequest?.kktUseCount;
      state.sendData.sendCountRequest.crsUseCount =
        data.sendCountRequest?.crsUseCount;
    });
    builder.addCase(getMySendDataThunk.rejected, (state, action) => {
      state.sendData = initialState.sendData;
    });
  },
});

export const { removeUserData } = actions;

export default reducer;
