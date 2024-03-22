interface SendCount {
  smsLimitCount: number | null;
  lmsLimitCount: number | null;
  mmsLimitCount: number | null;
  kktLimitCount: number | null;
  crsLimitCount: number | null;
  smsUseCount?: number | null;
  lmsUseCount?: number | null;
  mmsUseCount?: number | null;
  kktUseCount?: number | null;
  crsUseCount?: number | null;
}

export default SendCount;
