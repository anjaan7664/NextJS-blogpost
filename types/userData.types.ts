export interface UserList {
  docs: UserInterface[];
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

export type UserInterface = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
};
