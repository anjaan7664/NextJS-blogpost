export interface BlogList {
  docs: BlogInterface[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
}

export type BlogInterface = {
  _id: string;
  title: string;
  body:string;
  slug: string;
  status: string;
  approved: boolean;
  authorId: string;
  createdAt: Date;
};
