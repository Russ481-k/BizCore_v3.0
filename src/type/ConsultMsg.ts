interface ConsultMsg {
  callType: "S" | "R";
  message: string;
  sendDate: string;
  filePath: string | null;
}

export default ConsultMsg;
