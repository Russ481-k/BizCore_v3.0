interface ConsultListItem {
  id: number;
  customKey: string;
  callerNo: string;
  receiverNo: string;
  messageId: string;
  mastId: number;
  channel: "S" | "L" | "M"; // 단문:S / 장문:L / 멀티:M
  sendType: "A" | "C"; // A:안내 / C:문자상담
  callType: "S" | "R"; // S:발신 / R:
  subject: string;
  message: string;
  reqDate: string;
  sendDate: string;
  expireTime: number;
  isRead: boolean;
  isResult: boolean;
}
export default ConsultListItem;
