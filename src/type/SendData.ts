interface SendData {
  id: number | null;
  changeTime: boolean;
  subject?: string;
  callback?: string;
  msg?: string;
  templateCode?: string;
  type?: string;
  fileCnt?: number;
  files?: File[];
  reqDate?: string | null;
  sendType?: string;
  templateId?: number | null;
  filePath1?: string | null;
  filePath2?: string | null;
  filePath3?: string | null;
  addressArray?:
    | Array<{
        "#{이름}": string | null;
        "#{휴대전화번호}": string | null;
        "#{전화번호}": string | null;
        "#{변수1}": string;
        "#{변수2}": string;
        "#{변수3}": string;
        "#{변수4}": string;
      }>
    | [];
}

export default SendData;
