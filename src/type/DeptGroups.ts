import Department from "./Department";

interface DeptGroups {
  eminwonBody: Department[] | null;
  BizCoreBody: Department[] | null;
  eminwonTotal: number;
  BizCoreTotal: number;
  deptTotalCount: number;
}

export default DeptGroups;
