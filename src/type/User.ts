import SendAuth from "./SendAuth";
import SendCount from "./SendCount";

interface User {
  status?: string;
  userIdx?: number;
  userId: string;
  userName: string;
  positionName: string | null;
  deptCode: string | null;
  deptName?: string | null;
  permissionsId: number | null;
  wirelessPhoneNumber?: string | null;
  wiredPhoneNumber?: string | null;
  wiredPhoneNumberPlus?: string | null;
  crsPhoneNumber?: string | null;
  isMobytalk?: boolean | null;
  ssoLoginId?: string;
  password?: string;
  sendAuthorization: SendAuth;
  sendCountRequest: SendCount;
}

export default User;
