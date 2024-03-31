const API_URL = process.env.REACT_APP_API_URL;

export const menusUrl = (path: string) =>
  `${API_URL}/api/menus${path}`.replace(/\/$/, "");
export const programPermissionsUrl = (path: string) =>
  `${API_URL}/api/program-permissions${path}`.replace(/\/$/, "");
export const systemsUrl = (path: string) =>
  `${API_URL}/api/systems${path}`.replace(/\/$/, "");
export const teamsUrl = (path: string) =>
  `${API_URL}/api/teams${path}`.replace(/\/$/, "");
export const userRolesUrl = (path: string) =>
  `${API_URL}/api/user-roles${path}`.replace(/\/$/, "");
export const userRoleTeamsUrl = (path: string) =>
  `${API_URL}/api/user-role-teams${path}`.replace(/\/$/, "");
export const usersUrl = (path: string) =>
  `${API_URL}/api/users${path}`.replace(/\/$/, "");

export const auth = (path: string) =>
  `${API_URL}/api/auth${path}`.replace(/\/$/, "");
export const sopp = (path: string) =>
  `${API_URL}/api/sopp${path}`.replace(/\/$/, "");
export const cont = (path: string) =>
  `${API_URL}/api/cont${path}`.replace(/\/$/, "");
export const cust = (path: string) =>
  `${API_URL}/api/cust${path}`.replace(/\/$/, "");
export const sales = (path: string) =>
  `${API_URL}/api/sales${path}`.replace(/\/$/, "");
export const sched = (path: string) =>
  `${API_URL}/api/sched${path}`.replace(/\/$/, "");
export const techd = (path: string) =>
  `${API_URL}/api/techd${path}`.replace(/\/$/, "");
export const department = (path: string) =>
  `${API_URL}/api/department${path}`.replace(/\/$/, "");
export const permission = (path: string) =>
  `${API_URL}/api/permission${path}`.replace(/\/$/, "");
export const templateGroup = (path: string) =>
  `${API_URL}/api/template-group${path}`.replace(/\/$/, "");
export const template = (path: string) =>
  `${API_URL}/api/template${path}`.replace(/\/$/, "");
export const users = (path: string) =>
  `${API_URL}/api/users${path}`.replace(/\/$/, "");
export const excel = (path: string) =>
  `${API_URL}/api/${path}/excel`.replace(/\/$/, "");
