export const menusUrl = (path: string) =>
  `/api/menus${path}`.replace(/\/$/, "");
export const programPermissionsUrl = (path: string) =>
  `/api/program-permissions${path}`.replace(/\/$/, "");
export const systemsUrl = (path: string) =>
  `/api/systems${path}`.replace(/\/$/, "");
export const teamsUrl = (path: string) =>
  `/api/teams${path}`.replace(/\/$/, "");
export const userRolesUrl = (path: string) =>
  `/api/user-roles${path}`.replace(/\/$/, "");
export const userRoleTeamsUrl = (path: string) =>
  `/api/user-role-teams${path}`.replace(/\/$/, "");
export const usersUrl = (path: string) =>
  `/api/users${path}`.replace(/\/$/, "");

const version = "1";

export const auth = (path: string) =>
  `/api/v${version}/auth${path}`.replace(/\/$/, "");
export const addressGroup = (path: string) =>
  `/api/v${version}/address-group${path}`.replace(/\/$/, "");
export const address = (path: string) =>
  `/api/v${version}/address${path}`.replace(/\/$/, "");
export const alarmTalkTemplate = (path: string) =>
  `/api/v${version}/kakao-template${path}`.replace(/\/$/, "");
export const alarmTalkTemplateGroup = (path: string) =>
  `/api/v${version}/kakao-template-group${path}`.replace(/\/$/, "");
export const consultations = (path: string) =>
  `/api/v${version}/consultations${path}`.replace(/\/$/, "");
export const department = (path: string) =>
  `/api/v${version}/department${path}`.replace(/\/$/, "");
export const messages = (path: string) =>
  `/api/v${version}/messages${path}`.replace(/\/$/, "");
export const permission = (path: string) =>
  `/api/v${version}/permission${path}`.replace(/\/$/, "");
export const scenario = (path: string) =>
  `/api/v${version}/scenario${path}`.replace(/\/$/, "");
export const templateGroup = (path: string) =>
  `/api/v${version}/template-group${path}`.replace(/\/$/, "");
export const template = (path: string) =>
  `/api/v${version}/template${path}`.replace(/\/$/, "");
export const twoway = (path: string) =>
  `/api/v${version}/twoway${path}`.replace(/\/$/, "");
export const users = (path: string) =>
  `/api/v${version}/users${path}`.replace(/\/$/, "");
export const excel = (path: string) =>
  `/api/v${version}/${path}/excel`.replace(/\/$/, "");
