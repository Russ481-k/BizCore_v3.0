interface Template {
  count?: number;
  fileId?: number;
  groupTemplate?: {
    groupTemplateId?: number;
    groupTemplateName?: string;
  };
  createDate?: string;
  status?: string;
  templateChannel: string;
  templateId: number;
  templateCode: string;
  templateMsgContext: string;
  templateMsgTitle: string;
  templateName?: string;
  userName?: string;
  wiredPhoneNumber?: string;
  buttonMobileUrl1?: string;
  buttonMobileUrl2?: string;
  buttonMobileUrl3?: string;
  buttonMobileUrl4?: string;
  buttonMobileUrl5?: string;
  buttonName1?: string;
  buttonName2?: string;
  buttonName3?: string;
  buttonName4?: string;
  buttonName5?: string;
  buttonPcUrl1?: string;
  buttonPcUrl2?: string;
  buttonPcUrl3?: string;
  buttonPcUrl4?: string;
  buttonPcUrl5?: string;
  buttonType1?: string;
  buttonType2?: string;
  buttonType3?: string;
  buttonType4?: string;
  buttonType5?: string;
  kakaoGroupTemplate?: { groupTemplateId?: number; groupTemplateName?: string };
  groupTemplateId?: 2;
  groupTemplateName?: "기본 알림톡";
  files?: Array<{
    originFileName?: string;
    uniqueFileName: string;
    fileSize?: number;
    fileUrl?: string;
    file: File;
  }>;
  yellowIdKey?: string;
  changeFileOrder?: string[];
}

export default Template;
