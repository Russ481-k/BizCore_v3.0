interface User {
  userNo: number;
  compNo: number;
  userId: string;
  userName: string;
  userPasswd?: string;
  userTel: string | null;
  userEmail: string | null;
  userOtp: number;
  userRole: string;
  userCode: number;
  docRole: string;
  userKey: string;
  org_id: number;
  listDateFrom: string | null;
  regDatetime: string | null;
  modDatetime: string | null;
  attrib: string;
  userRank: string;
  userDept: string;
}

export default User;
