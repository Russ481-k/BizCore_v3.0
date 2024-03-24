interface UserListItem {
  userIdx: number;
  userId: string;
  userName: string;
  positionName: string;
  deptName: string;
  isBizCore: boolean;
  authName: string;
  isSmsUnlimited: boolean;
  isLmsUnlimited: boolean;
  isMmsUnlimited: boolean;
  isKktUnlimited: boolean;
  isCrsUnlimited: boolean;
  smsLimitCount: number;
  lmsLimitCount: number;
  mmsLimitCount: number;
  kktLimitCount: number;
  crsLimitCount: number;
  status: string;
}

export default UserListItem;
