export interface Role {
  id: string;
  role: string | null;
  description: string | null;
  is_deleted: boolean;
  created_at: string;
}

export type Permission = {
  id: string;
  category: string;
  permission: string;
  description: string;
  created_at: string;
};
