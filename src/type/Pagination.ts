interface Pagination {
  currentPage: number;
  pageSize: number;
  sort?: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalPage: number;
}

export default Pagination;
