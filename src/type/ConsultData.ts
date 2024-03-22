import ConsultMsg from "./ConsultMsg";

interface ConsultData {
  headerData: {
    id: number;
    callerNo: string;
    userName: string;
    userId: string;
    mastId: number;
    firstSendType: string;
    firstSendDate: string;
    receiverName: string;
    receiverNo: string;
    sendType: string;
    expireTime: string;
  };
  messageData: Array<ConsultMsg>;
}

export default ConsultData;
