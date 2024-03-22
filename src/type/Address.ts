interface Address {
  addressGroupId: number | null;
  addressGroupName: string | null;
  addressId: number;
  addressName: string | null;
  addressNumber: string | null;
  addressPhone: string | null;
  currentPage: number | null;
  keyword: string | null;
  note: string | null;
  offset: number | null;
  pageLength: number | null;
  pageSize: number | null;
  targetColumn: string | null;
  totalCount: number | null;
}

export default Address;
