import { RowDataPacket } from "mysql2"

export default interface Users extends RowDataPacket {
  id?: number;
  avatar?: string;
  username?: string;
  password?: string;
  email?: string;
  address?: string;
  role?: string;
}
