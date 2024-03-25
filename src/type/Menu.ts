interface Menu {
  groupMenuId: number;
  id: number;
  name?: string;
  icon?: string | null;
  programName?: string | null;
  programPath?: string | null;
  order?: number;
  useYN?: string;
  createDate?: string;
  updateDate?: string;
}

export default Menu;
