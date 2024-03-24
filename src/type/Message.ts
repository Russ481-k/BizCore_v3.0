import SendAuth from "./SendAuth";
import SendCount from "./SendCount";

interface Message {
  id: number;
  subject: string;
  sendType: string;
  callback: string;
  channelType: string;
  channel: string;
  status: string;
  msg: string;
  users: {
    createDate: string;
    updateDate: string;
    isDelete: boolean;
    userId: string;
    userName: string;
    deptCode: string;
    positionName: string;
    userLevel: string;
    ssoLoginId: string;
    password: string;
    wiredPhoneNumber: string;
    wiredPhoneNumberPlus: string;
    crsPhoneNumber: string;
    wirelessPhoneNumber: string;
    status: string;
    isBizCore: boolean;
    exitDate: string;
    permissions: {
      permissionsId: number;
      authName: string;
      generalUse: boolean;
      businessUse: boolean;
      deptUse: boolean;
      userCount: number;
      isDelete: boolean;
    };
    sendAuthorization: SendAuth;
    sendCount: SendCount;
  };
  createDate: string;
  reqDate: string;
  totalSendCount: number;
  successSendCount: number;
  failSendCount: number;
  createUser: string;
  files: [
    {
      originFileName: string;
      uniqueFileName: string;
      fileSize: number;
      fileUrl: string;
    }
  ];
}

export default Message;
