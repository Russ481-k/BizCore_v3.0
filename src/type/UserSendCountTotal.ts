interface UserSendCountTotal {
  monthLimitData: {
    applySmsLimitCount: number;
    applyLmsLimitCount: number;
    applyMmsLimitCount: number;
    applyKktLimitCount: number;
    applyCrsLimitCount: number;
    isSmsUnlimited: boolean;
    isLmsUnlimited: boolean;
    isMmsUnlimited: boolean;
    isKktUnlimited: boolean;
    isCrsUnlimited: boolean;
  };
}

export default UserSendCountTotal;
