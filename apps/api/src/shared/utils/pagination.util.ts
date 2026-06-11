export interface PaginationInput {
  page?: number;
  pageSize?: number;
}

export function resolvePagination(input: PaginationInput) {
  const page = Math.max(Number(input.page ?? 1), 1);
  const pageSize = Math.min(Math.max(Number(input.pageSize ?? 20), 1), 100);
  return {
    page,
    pageSize,
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
}
