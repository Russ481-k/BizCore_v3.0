import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { authLoginAPI, AuthLoginResponse } from "api/auth/login";
import { authLogoutAPI, AuthLogoutResponse } from "api/auth/logout";
import { authRefreshAPI, AuthRefreshResponse } from "api/auth/refresh";
import { getMyProfileAPI } from "api/users/current";
import User from "type/User";
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
  profile: User;
}
const initialState: UserState = {
  accessToken: null,
  profile: {
    userNo: 0,
    compNo: 0,
    userId: "",
    userName: "",
    userPasswd: "",
    userTel: "",
    userEmail: "",
    userOtp: 0,
    userRole: "",
    userCode: 0,
    docRole: "",
    userKey: "",
    org_id: 0,
    listDateFrom: "",
    regDatetime: "",
    modDatetime: "",
    attrib: "",
    userRank: "",
    userDept: "",
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
      state.profile.userNo = data.userNo;
      state.profile.compNo = data.compNo;
      state.profile.userId = data.userId;
      state.profile.userName = data.userName;
      state.profile.userPasswd = data.userPasswd;
      state.profile.userTel = data.userTel;
      state.profile.userEmail = data.userEmail;
      state.profile.userOtp = data.userOtp;
      state.profile.userRole = data.userRole;
      state.profile.userCode = data.userCode;
      state.profile.docRole = data.docRole;
      state.profile.userKey = data.userKey;
      state.profile.org_id = data.org_id;
      state.profile.listDateFrom = data.listDateFrom;
      state.profile.regDatetime = data.regDatetime;
      state.profile.modDatetime = data.modDatetime;
      state.profile.attrib = data.attrib;
      state.profile.userRank = data.userRank;
      state.profile.userDept = data.userDept;
    });
    builder.addCase(getMyProfileThunk.rejected, (state, action) => {
      state.profile = initialState.profile;
    });
  },
});

export const { removeUserData } = actions;

export default reducer;
