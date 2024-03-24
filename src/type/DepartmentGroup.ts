interface DepartmentGroup {
  groupName: string;
  isBizCore: boolean | null; // true: 추가조직 / false: 기본조직 / null : 전체
}
export default DepartmentGroup;
