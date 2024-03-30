interface Sched {
  schedNo: number;
  userNo: number;
  compNo: number;
  soppNo: number;
  custNo: number;
  schedName: string;
  schedForm: Date;
  schedTo: Date;
  schedTitle: string;
  schedDesc: string;
  schedCheck: number;
  subschedNo: number;
  schedActive: string;
  schedAllday: string;
  remindflag: string;
  schedType: number;
  schedPlace: string;
  schedColor: string;
  schedCat: string;
  contNo: number;
  regDatetime: Date;
  modDatetime: Date;
  attrib: string;
}

export default Sched;
