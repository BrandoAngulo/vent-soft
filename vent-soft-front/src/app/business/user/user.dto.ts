import { RolesDTO } from "./user-form/roles.dto";

export interface UserDTO {
  id: number;
  name: string;
  lastName: string;
  login: string;
  password: string,
  code: string;
  email: string;
  roles: RolesDTO;
  status: boolean;
}
