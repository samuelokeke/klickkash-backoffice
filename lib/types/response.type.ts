export interface HttpResponse<T = {}> {
  status: number;
  code: number;
  message: string;
  data?: T;
}

export type ResponseData<K extends string, T> = {
  total: string;
  currentPage: string;
  totalPages: number;
} & {
  [key in K]: T;
};
