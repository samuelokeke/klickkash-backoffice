export interface HttpResponse<T = unknown> {
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
