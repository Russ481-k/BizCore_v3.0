interface Scenario {
  id: string;
  groupId?: number;
  replyId: string | null;
  parentReplyId: string | null;
  code: string;
  title: string;
  msg: string;
  allowMMS: boolean;
  child?: Array<Scenario>;
  depth?: number;
  file?: File | null;
  filePath?: string | null;
}

export default Scenario;
