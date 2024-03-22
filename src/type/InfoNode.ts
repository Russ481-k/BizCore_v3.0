interface InfoNode {
  groupId: number;
  serviceName: string;
  isUse: boolean;
  mmsReply: { msg: string | null };
  autoreply: { msg: string };
  expired: { validTime: number; msg: string };
  exception: { msg: string };
  close: { msg: string };
  file: File | null;
}

export default InfoNode;
