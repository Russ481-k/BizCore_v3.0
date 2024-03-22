import UserSendData from "type/UserSendData";

const sendAvailableCount = {
  count(userSendData: UserSendData, channel: string): number | null {
    if (!!userSendData) {
      const isCrsUse = userSendData.sendAuthorization.isCrsUse;
      const isCrsUnlimited = userSendData.sendAuthorization.isCrsUnlimited;
      const crsLimitCount = userSendData.sendCountRequest.crsLimitCount ?? null;
      const crsUseCount = userSendData.sendCountRequest.crsUseCount ?? 0;

      const isSmsUse = userSendData.sendAuthorization.isSmsUse;
      const isSmsUnlimited = userSendData.sendAuthorization.isSmsUnlimited;
      const smsLimitCount = userSendData.sendCountRequest.smsLimitCount ?? null;
      const smsUseCount = userSendData.sendCountRequest.smsUseCount ?? 0;

      const isLmsUse = userSendData.sendAuthorization.isLmsUse;
      const isLmsUnlimited = userSendData.sendAuthorization.isLmsUnlimited;
      const lmsLimitCount = userSendData.sendCountRequest.lmsLimitCount ?? null;
      const lmsUseCount = userSendData.sendCountRequest.lmsUseCount ?? 0;

      const isMmsUse = userSendData.sendAuthorization.isMmsUse;
      const isMmsUnlimited = userSendData.sendAuthorization.isMmsUnlimited;
      const mmsLimitCount = userSendData.sendCountRequest.mmsLimitCount ?? null;
      const mmsUseCount = userSendData.sendCountRequest.mmsUseCount ?? 0;

      const isKktUse = userSendData.sendAuthorization.isKktUse;
      const isKktUnlimited = userSendData.sendAuthorization.isKktUnlimited;
      const kktLimitCount = userSendData.sendCountRequest.kktLimitCount ?? null;
      const kktUseCount = userSendData.sendCountRequest.kktUseCount ?? 0;

      const crsAvailableCount =
        !!crsLimitCount && !isCrsUnlimited ? crsLimitCount - crsUseCount : null;
      const smsAvailableCount =
        !!smsLimitCount && !isSmsUnlimited ? smsLimitCount - smsUseCount : null;
      const lmsAvailableCount =
        !!lmsLimitCount && !isLmsUnlimited ? lmsLimitCount - lmsUseCount : null;
      const mmsAvailableCount =
        !!mmsLimitCount && !isMmsUnlimited ? mmsLimitCount - mmsUseCount : null;
      const kktAvailableCount =
        !!kktLimitCount && !isKktUnlimited ? kktLimitCount - kktUseCount : null;

      if (isCrsUse && channel === "CRS") {
        return crsAvailableCount;
      } else if (isSmsUse && channel === "SMS") {
        return smsAvailableCount;
      } else if (isLmsUse && channel === "LMS") {
        return lmsAvailableCount;
      } else if (isMmsUse && channel === "MMS") {
        return mmsAvailableCount;
      } else if (isKktUse && channel === "KKT") {
        return kktAvailableCount;
      }
    }
    return 0;
  },
};

export default sendAvailableCount;
