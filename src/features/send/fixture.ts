export const KEYWORD = {
  SENDTYPE_AUTO: "안내",
  SENDTYPE_CHAT: "문자상담",
  STATUS_PROGRESS: "진행중",
  STATUS_END: "종료",
  TRANSFORM_ToA: "안내로 전환",
  TRANSFORM_ToC: "문자상담으로 전환",
};
export const CONSULTS_OPTION = {
  CALL_TYPE: [
    {
      name: "전체",
      code: "",
    },
    {
      name: "발신",
      code: "S",
    },
    {
      name: "수신",
      code: "R",
    },
  ],
  SEND_TYPE: [
    {
      name: "전체",
      code: "",
    },
    {
      name: "문자상담",
      code: "C",
    },
    {
      name: "안내",
      code: "A",
    },
  ],
  TARGET_COLUMN: [
    {
      name: "전체",
      code: "all",
    },
    {
      name: "수신번호",
      code: "receiverNo",
    },
    {
      name: "메시지 내용",
      code: "message",
    },
  ],
};
