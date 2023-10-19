import { UserRole } from "./userRoleEnum";

export interface UserModel {
  _id: string;
  email: string;
  name: string;
  password: string;
  address: string;
  role: UserRole;
  // TODO: 나중에 다시 확인
  createdAt: Date;
  updatedAt: Date;
}
