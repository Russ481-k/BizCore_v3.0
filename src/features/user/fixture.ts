import Option from "type/Option";

export const USERS_OPTION = {
  STATUS: [
    {
      code: "W",
      name: "재직",
    },
    {
      code: "D",
      name: "파견",
    },
    {
      code: "E",
      name: "퇴사",
    },
  ],
  POSITION: [
    {
      code: "1",
      name: "사원",
    },
    {
      code: "2",
      name: "대리",
    },
    {
      code: "3",
      name: "과장",
    },
    {
      code: "4",
      name: "차장",
    },
    {
      code: "5",
      name: "부장",
    },
    {
      code: "6",
      name: "이사",
    },
  ],
  TARGET_COLUMN: [
    {
      code: "all",
      name: "전체",
    },
    {
      code: "userId",
      name: "아이디",
    },
    {
      code: "userName",
      name: "이름",
    },
  ],
  CRS_USE: [
    {
      code: "all",
      name: "전체",
    },
    {
      code: "used",
      name: "사용",
    },
    {
      code: "unused",
      name: "미사용",
    },
  ],
};
export const CHANNEL_OPTION: Option[] = [
  {
    name: "단문(SMS)",
    code: "sms",
  },
  {
    name: "장문(LMS)",
    code: "lms",
  },
  {
    name: "멀티(MMS)",
    code: "mms",
  },
  {
    name: "알림톡",
    code: "kkt",
  },
  {
    name: "양방향",
    code: "crs",
  },
];
