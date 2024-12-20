import { Role } from "./role.type";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar: string | null;
  is_activated: boolean;
  user_type: UserType;
  role: Role;
}

export type UserType = "customer" | "admin";
