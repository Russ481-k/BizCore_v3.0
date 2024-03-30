/* components */
export { default as Login } from "./pages/Login";
export { default as ChangePwd } from "./pages/ChangePwd";

/* components - menu */
export { default as UserManage } from "./pages/UserManage";
export { default as Permission } from "./pages/Permission";
export { default as StaffContact } from "./pages/StaffContact";
export { default as Default } from "./pages/Default";
export { default as AutoSendMessage } from "./pages/AutoSendMessage";
export { default as CommonCode } from "./pages/CommonCode";

/* hooks */
export { default as useAddDept } from "./hooks/useAddDept";
export { default as useAddUser } from "./hooks/useAddUser";
export { default as useAuthLogoutKill } from "./hooks/useAuthLogoutKill";
export { default as useChangeDept } from "./hooks/useChangeDept";
export { default as useChangeMyProfile } from "./hooks/useChangeMyProfile";
export { default as useChangeMyPwd } from "./hooks/useChangeMyPwd";
export { default as useChangeUser } from "./hooks/useChangeUser";
export { default as useCheckPwd } from "./hooks/useCheckPwd";
export { default as useDeleteDept } from "./hooks/useDeleteDept";
export { default as useDeleteUser } from "./hooks/useDeleteUser";
export { default as useGetCrs } from "./hooks/useGetCrs";
export { default as useGetDept } from "./hooks/useGetDept";
export { default as useGetDeptGroups } from "./hooks/useGetDeptGroups";
export { default as useGetPermission } from "./hooks/usePermission";
export { default as useGetSendCountTotal } from "./hooks/useGetSendCountTotal";
export { default as useGetUser } from "./hooks/useGetUser";
export { default as useGetUsers } from "./hooks/useGetUsers";
export { default as useGetValidDept } from "./hooks/useGetValidDept";
export { default as useGetValidUser } from "./hooks/useGetValidUser";
export { default as useResetPwd } from "./hooks/useResetPwd";

/* redux - reducer */
export { reducer } from "./redux";
/* redux - action */
export { removeUserData } from "./redux";
/* redux - thunk */
export {
  authLoginThunk,
  authRefreshThunk,
  authLogoutThunk,
  getMyProfileThunk,
} from "./redux";

export { USERS_OPTION, CHANNEL_OPTION } from "./fixture";
