interface Permission {
  permissionsId: number;
  authName: string;
  generalUse: boolean;
  businessUse: boolean;
  deptUse: boolean;
  userCount: number;
}

export default Permission;
