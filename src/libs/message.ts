const message = {
  compId: {
    login: "기업ID를 입력하세요.",
    required: "기업ID는 필수 입력 항목입니다.",
  },
  addressGroupName: {
    required: "주소록 그룹명을 입력하세요.",
    pattern: "2~20자 이내로 주소록 그룹명을 입력하세요.",
  },
  deptName: {
    required: "부서명을 입력하세요.",
    pattern: "2~20자 이내로 부서명을 입력하세요.",
  },
  doubleCheck: "중복체크 중입니다.",
  limitCount: {
    required: "1 이상의 정수로 입력하세요.",
  },
  password: {
    login: "비밀번호를 입력하세요.",
    change: {
      pattern: "새 비밀번호를 6~18자리로 입력하세요.",
      check: "새 비밀번호가 일치하지 않습니다. 확인 후 다시 입력하세요.",
    },
  },
  permission: {
    required: "권한을 선택하세요. 권한은 필수 선택 항목입니다.",
  },
  phoneNumber: {
    pattern: "형식에 맞지 않는 전화번호입니다. 확인 후 다시 입력하세요",
    uniqueness: "동일한 번호가 이미 입력되었습니다. 다른 번호로 입력하세요.",
  },
  position: {
    required: "직급(직책)을 선택하세요. 직급(직책)은 필수 선택 항목입니다.",
  },
  userId: {
    login: "아이디를 입력하세요.",
    required: "아이디는 필수 입력 항목입니다.",
    pattern: "4~16자의 영문(소문자) 및 숫자로 아이디를 입력하세요.",
    doubleCheck: "이미 사용중인 아이디입니다.",
  },
  userName: {
    required: "이름은 필수 입력 항목입니다.",
    pattern: "2~10자로 이름을 입력하세요. (특수문자 사용 불가)",
  },
  templateName: {
    required: "명을 입력하세요.",
    pattern: "2~20자 이내로 명을 입력하세요.",
  },
  templateGroupName: {
    required: " 그룹명을 입력하세요.",
    pattern: "2~20자 이내로  그룹명을 입력하세요.",
  },
};

export default message;
