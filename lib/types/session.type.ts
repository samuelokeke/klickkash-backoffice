import { User } from "./user.type";

export type SessionPayload = {
  user: User;
  expiresAt: Date;
};
